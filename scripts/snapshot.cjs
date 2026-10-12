const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Kitchens', path: '/modular-kitchens' },
  { name: 'Wardrobes', path: '/modular-wardrobes' },
  { name: 'Talk to Us', path: '/talk-to-us' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Franchise Opportunities', path: '/franchise-opportunities' },
  { name: 'Franchise Enquiry', path: '/franchise-enquiry' },
];

async function run() {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const snapshot = {};

  for (const r of routes) {
    console.log(`Snapshotting ${r.name} (${r.path})...`);
    await page.goto(`http://localhost:3000${r.path}`, { waitUntil: 'networkidle' });
    // Allow any dynamic client title/meta or content hydration to settle
    await page.waitForTimeout(1000);

    const pageData = await page.evaluate(() => {
      const title = document.title;
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(h => ({ tag: h.tagName.toLowerCase(), text: h.innerText.trim() }));
      
      const images = Array.from(document.querySelectorAll('img'))
        .map(img => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' }));
      
      const links = Array.from(document.querySelectorAll('a[href]'))
        .map(a => ({ href: a.getAttribute('href'), text: a.innerText.trim() }));
      
      const buttons = Array.from(document.querySelectorAll('button'))
        .map(b => b.innerText.trim())
        .filter(Boolean);
      
      const formFields = Array.from(document.querySelectorAll('input, select, textarea'))
        .map(f => ({
          tag: f.tagName.toLowerCase(),
          name: f.getAttribute('name') || f.getAttribute('id') || '',
          placeholder: f.getAttribute('placeholder') || '',
          type: f.getAttribute('type') || ''
        }));
      
      const main = document.querySelector('main') || document.body;
      const mainText = main.innerText.replace(/\s+/g, ' ').trim();

      return {
        title,
        metaDesc,
        headings,
        images,
        links,
        buttons,
        formFields,
        mainTextLength: mainText.length,
        mainTextSnippet: mainText.slice(0, 300),
      };
    });

    snapshot[r.name] = pageData;
  }

  await browser.close();

  const outDir = path.join(__dirname, '..', 'test-results');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, process.argv[2] || 'content-snapshot-before.json');
  fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf-8');
  console.log(`Snapshot saved to ${outFile}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
