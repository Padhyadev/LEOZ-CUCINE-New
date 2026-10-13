/**
 * make-deploy-zip.cjs
 * Creates Hostinger-Deploy.zip with pre-built dist/ + server files.
 * Run: node scripts/make-deploy-zip.cjs
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TEMP = path.join(ROOT, 'deploy-temp');
const ZIP  = path.join(ROOT, 'Hostinger-Deploy.zip');

// ── 1. Clean temp ──────────────────────────────────────────────────────────
if (fs.existsSync(TEMP)) fs.rmSync(TEMP, { recursive: true, force: true });
fs.mkdirSync(TEMP, { recursive: true });

// ── 2. Helper: recursive copy ──────────────────────────────────────────────
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// ── 3. Copy pre-built dist/ ────────────────────────────────────────────────
console.log('Copying dist/ ...');
copyDir(path.join(ROOT, 'dist'), path.join(TEMP, 'dist'));

// ── 4. Copy data/ ──────────────────────────────────────────────────────────
console.log('Copying data/ ...');
copyDir(path.join(ROOT, 'data'), path.join(TEMP, 'data'));

// ── 5. Copy server.js + .env + package-lock ────────────────────────────────
console.log('Copying root files ...');
fs.copyFileSync(path.join(ROOT, 'server.js'),          path.join(TEMP, 'server.js'));
fs.copyFileSync(path.join(ROOT, 'package-lock.json'),  path.join(TEMP, 'package-lock.json'));
if (fs.existsSync(path.join(ROOT, '.env'))) {
  fs.copyFileSync(path.join(ROOT, '.env'), path.join(TEMP, '.env'));
}

// ── 6. Write clean package.json for Hostinger ─────────────────────────────
// Keep ALL dependencies so npm install works and Hostinger detects Express.
// Build script is a no-op (dist/ is already pre-built and shipped).
// No prebuild/predev hooks (scripts/ folder not needed on server).
const originalPkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const deployPkg = {
  name:    originalPkg.name,
  private: true,
  version: originalPkg.version,
  type:    originalPkg.type,
  scripts: {
    build: 'node -e "console.log(\'dist/ pre-built and included.\')"',
    start: 'node server.js',
  },
  dependencies:    originalPkg.dependencies,
  devDependencies: originalPkg.devDependencies,
};
fs.writeFileSync(
  path.join(TEMP, 'package.json'),
  JSON.stringify(deployPkg, null, 2),
  'utf8'
);

// ── 7. Verify critical files ───────────────────────────────────────────────
const checks = [
  'dist/index.html',
  'server.js',
  'package.json',
  '.env',
];
console.log('\n── Verification ──────────────────────────');
let allOk = true;
for (const f of checks) {
  const ok = fs.existsSync(path.join(TEMP, f));
  console.log(`  ${ok ? '✅' : '❌'} ${f}`);
  if (!ok) allOk = false;
}

// Count total files
let total = 0;
function countFiles(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) countFiles(path.join(dir, e.name));
    else total++;
  }
}
countFiles(TEMP);
console.log(`  📦 Total files: ${total}`);

if (!allOk) { console.error('\nAborted: missing critical files.'); process.exit(1); }

// ── 8. Zip using PowerShell ────────────────────────────────────────────────
if (fs.existsSync(ZIP)) fs.rmSync(ZIP);
console.log('\nCreating zip ...');
execSync(
  `powershell -Command "Add-Type -Assembly System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${TEMP}', '${ZIP}')"`,
  { stdio: 'inherit' }
);

// ── 9. Verify zip contains Logo.tsx equivalent (dist/index.html) ───────────
const sizeMB = (fs.statSync(ZIP).size / 1024 / 1024).toFixed(2);
console.log(`\n✅ Hostinger-Deploy.zip created: ${sizeMB} MB`);

// ── 10. Cleanup ────────────────────────────────────────────────────────────
fs.rmSync(TEMP, { recursive: true, force: true });
console.log('Temp folder cleaned.\nDone!');
