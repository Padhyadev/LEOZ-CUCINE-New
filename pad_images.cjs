const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function padImage(filePath, targetWidth, targetHeight, outputFileName) {
  const fileExt = path.extname(filePath);
  const dirName = path.dirname(filePath);
  const outputPath = path.join(dirName, outputFileName);
  
  try {
    await sharp(filePath)
      .resize({
        width: targetWidth,
        height: targetHeight,
        fit: 'contain',
        background: { r: 24, g: 24, b: 24, alpha: 1 } // #181818 Dark background
      })
      .toFile(outputPath);
    console.log(`Padded ${filePath} -> ${outputPath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

async function main() {
  const publicDir = path.join(__dirname, 'public');
  const srcAssetsDir = path.join(__dirname, 'src', 'assets');

  // 1. Philosophy (1:1)
  await padImage(path.join(publicDir, 'PHILOSOPHY.png'), 1000, 1000, 'PHILOSOPHY_padded.png');
  
  // 2. Modular Kitchen (1:1)
  await padImage(path.join(publicDir, 'modular kitchen.webp'), 1000, 1000, 'modular_kitchen_padded.webp');
  
  // 3. Modular Wardrobe (1:1)
  await padImage(path.join(publicDir, 'Modular Wardrobe.jpeg'), 1000, 1000, 'Modular_Wardrobe_padded.jpeg');
  
  // 4. Consultation (16:9)
  await padImage(path.join(srcAssetsDir, 'kitchen_opus.jpg'), 1920, 1080, 'kitchen_opus_padded.jpg');
}

main();
