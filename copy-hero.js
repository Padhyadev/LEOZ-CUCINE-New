const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\be085ff1-1c6d-438a-94d1-60322816abb4\\media__1785762946621.png';
const dest1 = path.join(__dirname, 'public', 'hero-inner.png');
const dest2 = path.join(__dirname, 'src', 'assets', 'hero-inner.png');

try {
  fs.copyFileSync(src, dest1);
  fs.copyFileSync(src, dest2);
  console.log('SUCCESS');
} catch (err) {
  console.error('ERROR:', err);
}
