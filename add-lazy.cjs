const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir, {withFileTypes: true});
  for (const f of files) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) processDir(p);
    else if (p.endsWith('.ts') || p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      let newC = c.replace(/<img(?![^>]*loading=)/g, '<img loading="lazy"');
      if (c !== newC) {
        fs.writeFileSync(p, newC);
        console.log('Updated ' + p);
      }
    }
  }
}

processDir('src');
