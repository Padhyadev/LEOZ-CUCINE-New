/**
 * make-deploy-zip.cjs
 *
 * Creates a Hostinger Node.js deployment zip (Hostinger-Deploy.zip) containing
 * a production frontend build (dist/) and Express server backend.
 *
 * Requirements fulfilled:
 * 1. Fresh production build (runs embed-logo and vite build).
 * 2. Zip contents at the root: package.json, package-lock.json, server.js, dist/, data/ (if present), .env.
 * 3. Clean package.json: UTF-8 without BOM, start & build scripts, runtime dependencies only.
 * 4. Fresh package-lock.json generated via npm install --package-lock-only --ignore-scripts.
 * 5. Native Windows bsdtar (C:\Windows\System32\tar.exe) used with forward slashes.
 * 6. Automated verification checks:
 *    - package.json at zip root
 *    - dist/index.html exists
 *    - No backslash '\' in any entry name
 *    - package.json does not contain UTF-8 BOM (EF BB BF)
 *    - package.json parses as valid JSON
 *    - Prints zip size and entry count
 *
 * Run:
 *   node scripts/make-deploy-zip.cjs            (includes .env as confirmed)
 *   node scripts/make-deploy-zip.cjs --no-env   (excludes .env)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const TEMP = path.join(ROOT, 'deploy-temp');
const ZIP = path.join(ROOT, 'Hostinger-Deploy.zip');
const TAR = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');

// Confirmed to include .env by default; can be disabled with --no-env or --without-env
const WITH_ENV = !process.argv.includes('--no-env') && !process.argv.includes('--without-env');

const run = (cmd, cwd = ROOT) => {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
};

console.log('====================================================');
console.log('   Creating Hostinger Node.js Deployment Package    ');
console.log('====================================================\n');

// ── 1. Production Build ────────────────────────────────────────────────────
console.log('📦 Step 1: Running production build...');
const embedLogoPath = path.join(ROOT, 'scripts', 'embed-logo.js');
if (fs.existsSync(embedLogoPath)) {
  run('node scripts/embed-logo.js');
}
run('npx vite build');

// ── 2. Prepare Temp Staging Directory ──────────────────────────────────────
console.log('\n📁 Step 2: Preparing staging directory...');
if (fs.existsSync(TEMP)) {
  fs.rmSync(TEMP, { recursive: true, force: true });
}
fs.mkdirSync(TEMP, { recursive: true });

// Helper: Recursive copy
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

// ── 3. Copy Files to Zip Root ──────────────────────────────────────────────
console.log('\n📄 Step 3: Copying server and static assets to staging root...');
copyDir(path.join(ROOT, 'dist'), path.join(TEMP, 'dist'));

const dataDir = path.join(ROOT, 'data');
if (fs.existsSync(dataDir)) {
  copyDir(dataDir, path.join(TEMP, 'data'));
  console.log('  ✓ Included data/ directory');
}

fs.copyFileSync(path.join(ROOT, 'server.js'), path.join(TEMP, 'server.js'));
console.log('  ✓ Included server.js');

const envPath = path.join(ROOT, '.env');
if (WITH_ENV) {
  if (fs.existsSync(envPath)) {
    fs.copyFileSync(envPath, path.join(TEMP, '.env'));
    console.log('  ✓ Included .env (confirmed)');
  } else {
    console.warn('  ⚠️ .env requested but .env file not found');
  }
} else {
  console.log('  ℹ️ .env excluded (--no-env specified)');
}

// ── 4. Generate Clean package.json (No BOM, Express Runtime Only) ───────────
console.log('\n⚙️ Step 4: Generating clean package.json for Express Hostinger deployment...');
const originalPkgRaw = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8').replace(/^\uFEFF/, '');
const originalPkg = JSON.parse(originalPkgRaw);

const deployPkg = {
  name: originalPkg.name || 'leoz-cucine',
  version: originalPkg.version || '1.0.0',
  type: originalPkg.type || 'module',
  main: 'server.js',
  engines: {
    node: '>=18'
  },
  scripts: {
    start: 'node server.js',
    build: 'echo dist is pre-built'
  },
  dependencies: originalPkg.dependencies || {}
};

// Write UTF-8 without BOM using Node.js fs.writeFileSync
fs.writeFileSync(path.join(TEMP, 'package.json'), JSON.stringify(deployPkg, null, 2) + '\n', 'utf8');
console.log('  ✓ Created clean package.json without devDependencies or BOM');

// ── 5. Generate Matched package-lock.json ──────────────────────────────────
console.log('\n🔒 Step 5: Generating fresh package-lock.json in staging folder...');
run('npm install --package-lock-only --ignore-scripts --no-audit --no-fund', TEMP);
console.log('  ✓ package-lock.json generated');

// ── 6. Create Zip Archive Using Windows bsdtar ─────────────────────────────
console.log('\n🗜️ Step 6: Compressing files with Windows bsdtar (ensuring forward-slash paths)...');
if (!fs.existsSync(TAR)) {
  console.error(`❌ Windows bsdtar not found at: ${TAR}`);
  process.exit(1);
}

if (fs.existsSync(ZIP)) {
  fs.rmSync(ZIP, { force: true });
}

// Collect all top-level entries inside TEMP
const entries = fs.readdirSync(TEMP).map((e) => `"${e}"`).join(' ');
run(`"${TAR}" -a -c -f "${ZIP}" ${entries}`, TEMP);

// ── 7. Verification Checks ─────────────────────────────────────────────────
console.log('\n🔍 Step 7: Verifying archive integrity and Hostinger compliance...');
const errors = [];

// Verify tar listing
const rawListing = execSync(`"${TAR}" -t -f "${ZIP}"`, { encoding: 'utf8' });
const listing = rawListing.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

// Check 1: package.json is at zip root
if (!listing.includes('package.json')) {
  errors.push('package.json is missing or not located at the zip root.');
}

// Check 2: dist/index.html exists
if (!listing.includes('dist/index.html')) {
  errors.push('dist/index.html is missing inside the zip.');
}

// Check 3: No entry contains a backslash '\'
const backslashEntries = listing.filter((item) => item.includes('\\'));
if (backslashEntries.length > 0) {
  errors.push(`Zip contains ${backslashEntries.length} entries with backslash paths: ${backslashEntries.slice(0, 3).join(', ')}...`);
}

// Check 4: package.json does not start with BOM bytes EF BB BF
const zippedPkgBuffer = execSync(`"${TAR}" -x -O -f "${ZIP}" package.json`);
if (zippedPkgBuffer.length >= 3 && zippedPkgBuffer[0] === 0xEF && zippedPkgBuffer[1] === 0xBB && zippedPkgBuffer[2] === 0xBF) {
  errors.push('package.json starts with UTF-8 BOM bytes (EF BB BF), which Hostinger cannot parse.');
}

// Check 5: package.json parses as valid JSON
try {
  const parsedPkg = JSON.parse(zippedPkgBuffer.toString('utf8'));
  if (parsedPkg.main !== 'server.js') {
    errors.push(`package.json "main" should be "server.js", found: "${parsedPkg.main}"`);
  }
} catch (e) {
  errors.push(`package.json in zip failed JSON parsing: ${e.message}`);
}

// Stop with error if any check fails
if (errors.length > 0) {
  console.error('\n❌ VERIFICATION FAILED:');
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

// ── 8. Summary & Success ───────────────────────────────────────────────────
const zipStat = fs.statSync(ZIP);
const sizeMB = (zipStat.size / (1024 * 1024)).toFixed(2);

console.log('  ✅ Check passed: package.json is at zip root');
console.log('  ✅ Check passed: dist/index.html exists');
console.log('  ✅ Check passed: All paths use forward slashes (no Windows backslashes)');
console.log('  ✅ Check passed: package.json has NO UTF-8 BOM');
console.log('  ✅ Check passed: package.json parses as valid JSON');
console.log(`  ✅ Check passed: Zip size: ${sizeMB} MB (${zipStat.size.toLocaleString()} bytes)`);
console.log(`  ✅ Check passed: Zip contains ${listing.length} total entries`);
if (WITH_ENV && fs.existsSync(envPath)) {
  console.log('  ✅ .env file is included at zip root');
}

// ── 9. Cleanup ─────────────────────────────────────────────────────────────
fs.rmSync(TEMP, { recursive: true, force: true });
console.log('\n🧹 Temporary staging directory cleaned.');
console.log(`\n🎉 Success! Deployment archive ready: ${ZIP}`);
console.log('Hostinger configuration:');
console.log('  • Framework: Express');
console.log('  • Entry file: server.js');
console.log('  • Start command: npm start');
console.log('  • Node.js version: 18 or 20');
