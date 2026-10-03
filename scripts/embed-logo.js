import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const possiblePaths = [
  path.join(__dirname, '..', 'LEOZ logo.png'),
  path.join(__dirname, '..', '..', 'LEOZ logo.png'),
  path.join(__dirname, '..', 'Leoz_logo_page_1.png'),
];

let foundPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    foundPath = p;
    break;
  }
}

if (!foundPath) {
  const parent = path.join(__dirname, '..', '..');
  if (fs.existsSync(parent)) {
    const files = fs.readdirSync(parent);
    for (const f of files) {
      if (f.toLowerCase().includes('logo') && (f.endsWith('.png') || f.endsWith('.jpg'))) {
        foundPath = path.join(parent, f);
        break;
      }
    }
  }
}

if (foundPath) {
  console.log(`Found logo file at: ${foundPath}`);
  const buffer = fs.readFileSync(foundPath);
  const base64 = buffer.toString('base64');
  const ext = path.extname(foundPath).replace('.', '') || 'png';
  const dataUrl = `data:image/${ext};base64,${base64}`;

  const tsContent = `/* Automatically generated from ${foundPath.replace(/\\/g, '/')} */\nexport const logoData = "${dataUrl}";\n`;
  const outPath = path.join(__dirname, '..', 'src', 'assets', 'logoData.ts');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, tsContent, 'utf-8');
  console.log(`Successfully written embedded logo to ${outPath}`);
} else {
  console.error('No logo image file found.');
}

