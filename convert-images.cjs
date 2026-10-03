const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDirs = ['public', 'src'];

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // Skip favicon.png
      if (entry.name === 'favicon.png') continue;

      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outPath = fullPath.replace(ext, '.webp');
        try {
          await sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(outPath);
          console.log(`Converted: ${fullPath} -> ${outPath}`);
          // Remove original file after successful conversion
          fs.unlinkSync(fullPath);
          console.log(`Deleted original: ${fullPath}`);
        } catch (err) {
          console.error(`Failed to convert ${fullPath}:`, err);
        }
      }
    }
  }
}

async function main() {
  for (const dir of targetDirs) {
    const fullDirPath = path.join(__dirname, dir);
    if (fs.existsSync(fullDirPath)) {
      console.log(`Processing directory: ${dir}`);
      await processDirectory(fullDirPath);
    }
  }
  console.log('Conversion complete.');
}

main();
