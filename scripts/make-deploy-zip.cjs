/**
 * make-deploy-zip.cjs
 * Builds dist/ and creates Hostinger-Deploy.zip (dist/ + Express server) for
 * Hostinger's Node.js deployments.
 * Run: node scripts/make-deploy-zip.cjs
 *
 * Hostinger rejects the upload with "Unsupported framework or invalid project
 * structure" when it cannot read package.json at the zip root. Two things
 * caused that before: a UTF-8 BOM in package.json (written by PowerShell) and
 * backslash paths in the zip (.NET ZipFile on Windows). This script writes
 * package.json from Node (no BOM), zips with Windows' bsdtar (forward slashes)
 * and checks both in the finished zip.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TEMP = path.join(ROOT, 'deploy-temp');
const ZIP  = path.join(ROOT, 'Hostinger-Deploy.zip');
// Windows' own tar (bsdtar) can write .zip; Git Bash's GNU tar cannot.
const TAR  = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');

const run = (cmd, cwd = ROOT) => execSync(cmd, { cwd, stdio: 'inherit' });

// ── 1. Fresh production build ──────────────────────────────────────────────
console.log('Building dist/ ...');
run('node scripts/embed-logo.js');
run('npx vite build');

// ── 2. Clean temp ──────────────────────────────────────────────────────────
if (fs.existsSync(TEMP)) fs.rmSync(TEMP, { recursive: true, force: true });
fs.mkdirSync(TEMP, { recursive: true });

// ── 3. Helper: recursive copy ──────────────────────────────────────────────
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// ── 4. Copy dist/, data/, server.js, .env ──────────────────────────────────
console.log('Copying files ...');
copyDir(path.join(ROOT, 'dist'), path.join(TEMP, 'dist'));
copyDir(path.join(ROOT, 'data'), path.join(TEMP, 'data'));
fs.copyFileSync(path.join(ROOT, 'server.js'), path.join(TEMP, 'server.js'));
if (fs.existsSync(path.join(ROOT, '.env'))) {
  fs.copyFileSync(path.join(ROOT, '.env'), path.join(TEMP, '.env'));
}

// ── 5. Write a clean package.json for Hostinger ───────────────────────────
// Runtime dependencies only, so Hostinger detects an Express app rather than
// a Vite site (vite in devDependencies makes it try to build and serve dist/
// statically, which drops the /api routes). Build is a no-op: dist/ ships
// pre-built.
const originalPkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8').replace(/^\uFEFF/, ''));
const deployPkg = {
  name:    originalPkg.name,
  private: true,
  version: originalPkg.version,
  type:    originalPkg.type,
  main:    'server.js',
  engines: { node: '>=18' },
  scripts: {
    build: 'node -e "console.log(\'dist/ pre-built and included.\')"',
    start: 'node server.js',
  },
  dependencies: originalPkg.dependencies,
};
fs.writeFileSync(path.join(TEMP, 'package.json'), JSON.stringify(deployPkg, null, 2) + '\n', 'utf8');

// Lock file that matches the trimmed package.json (npm ci fails on a mismatch).
console.log('Generating package-lock.json ...');
run('npm install --package-lock-only --ignore-scripts --no-audit --no-fund', TEMP);

// ── 6. Verify critical files ───────────────────────────────────────────────
const checks = ['dist/index.html', 'server.js', 'package.json', 'package-lock.json', '.env'];
console.log('\n── Verification ──────────────────────────');
let allOk = true;
for (const f of checks) {
  const ok = fs.existsSync(path.join(TEMP, f));
  console.log(`  ${ok ? '✅' : '❌'} ${f}`);
  if (!ok) allOk = false;
}
if (!allOk) { console.error('\nAborted: missing critical files.'); process.exit(1); }

// ── 7. Zip (files at the zip root, forward-slash paths) ────────────────────
if (fs.existsSync(ZIP)) fs.rmSync(ZIP);
console.log('\nCreating zip ...');
const entries = fs.readdirSync(TEMP).map((e) => `"${e}"`).join(' ');
run(`"${TAR}" -a -c -f "${ZIP}" ${entries}`, TEMP);

// ── 8. Check the zip Hostinger will read ───────────────────────────────────
const listing = execSync(`"${TAR}" -t -f "${ZIP}"`, { encoding: 'utf8' }).split(/\r?\n/).filter(Boolean);
const problems = [];
if (!listing.includes('package.json')) problems.push('package.json is not at the zip root');
if (!listing.includes('dist/index.html')) problems.push('dist/index.html missing');
if (listing.some((n) => n.includes('\\'))) problems.push('backslash paths in zip');
const zippedPkg = execSync(`"${TAR}" -x -O -f "${ZIP}" package.json`);
if (zippedPkg[0] === 0xef && zippedPkg[1] === 0xbb && zippedPkg[2] === 0xbf) problems.push('package.json has a BOM');
try { JSON.parse(zippedPkg.toString('utf8')); } catch { problems.push('package.json is not valid JSON'); }
if (problems.length) { console.error('\n❌ Zip check failed:\n  - ' + problems.join('\n  - ')); process.exit(1); }

const sizeMB = (fs.statSync(ZIP).size / 1024 / 1024).toFixed(2);
console.log(`\n✅ Hostinger-Deploy.zip created: ${sizeMB} MB, ${listing.length} entries`);

// ── 9. Cleanup ─────────────────────────────────────────────────────────────
fs.rmSync(TEMP, { recursive: true, force: true });
console.log('Temp folder cleaned.\nDone!');
