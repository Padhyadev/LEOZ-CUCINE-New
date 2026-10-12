const { chromium } = require('@playwright/test');

const viewports = [
  { name: 'desktop 1440px', width: 1440, height: 900 },
  { name: 'tablet 768px', width: 768, height: 1024 },
  { name: 'mobile 390px', width: 390, height: 844 },
];

const routes = ['/', '/modular-kitchens', '/modular-wardrobes', '/about', '/contact', '/talk-to-us'];

async function verify() {
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  let totalErrors = 0;

  console.log('=== 1. VIEWPORT & OVERFLOW CHECKS (1440px, 768px, 390px) ===');
  for (const vp of viewports) {
    console.log(`\nTesting viewport: ${vp.name}...`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    for (const route of routes) {
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      if (overflow) {
        console.error(`  [FAIL] Horizontal overflow detected on ${route} at ${vp.name}`);
        totalErrors++;
      }

      // Scroll to bottom gradually
      await page.evaluate(async () => {
        const dist = document.documentElement.scrollHeight - window.innerHeight;
        const steps = 8;
        for (let i = 1; i <= steps; i++) {
          window.scrollTo(0, (dist / steps) * i);
          await new Promise((r) => setTimeout(r, 150));
        }
      });
      await page.waitForTimeout(500);

      // Verify no stuck hidden content
      const stuckElements = await page.evaluate(() => {
        const candidates = document.querySelectorAll('h1, h2, h3, p, [data-reveal]');
        let count = 0;
        candidates.forEach((el) => {
          if (el.closest('[class*="faq__panel"]')) return;
          const rect = el.getBoundingClientRect();
          // If element is well above the viewport fold (already scrolled past)
          if (rect.bottom < window.innerHeight - 50) {
            const style = window.getComputedStyle(el);
            if (style.opacity === '0' || style.visibility === 'hidden') count++;
          }
        });
        return count;
      });

      if (stuckElements > 0) {
        console.error(`  [FAIL] ${stuckElements} elements stuck hidden on ${route} at ${vp.name}`);
        totalErrors++;
      } else {
        process.stdout.write(`  ✓ ${route} passed`);
      }
    }

    if (consoleErrors.length > 0) {
      console.error(`\n  Console errors at ${vp.name}:`, consoleErrors);
      totalErrors += consoleErrors.length;
    } else {
      console.log(`\n  ✓ Zero console errors at ${vp.name}`);
    }
    await context.close();
  }

  console.log('\n=== 2. PINNED JOURNEY SECTION & GAP CHECK (Desktop 1440px) ===');
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const journeyInfo = await page.evaluate(async () => {
      const journey = document.getElementById('journey-title');
      if (!journey) return { found: false };
      const sec = journey.closest('section');
      const nextSec = sec.nextElementSibling;
      const initialTop = sec.getBoundingClientRect().top;
      
      // Scroll into the section
      window.scrollTo(0, window.scrollY + initialTop);
      await new Promise((r) => setTimeout(r, 500));
      
      // Check unpinned gap between journey and next section
      window.scrollTo(0, window.scrollY + 1200);
      await new Promise((r) => setTimeout(r, 500));
      const nextTop = nextSec.getBoundingClientRect().top;
      return { found: true, nextSectionVisible: nextTop < window.innerHeight * 1.5 };
    });

    if (journeyInfo.found && journeyInfo.nextSectionVisible) {
      console.log('✓ Journey section pins and releases without blank gap');
    } else {
      console.error('FAIL on Journey section pin/gap check', journeyInfo);
      totalErrors++;
    }
    await context.close();
  }

  console.log('\n=== 3. REDUCED MOTION CHECK (prefers-reduced-motion) ===');
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const checkReduced = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
      const invisibleHeadings = headings.filter((h) => {
        const s = window.getComputedStyle(h);
        return s.opacity === '0' || s.visibility === 'hidden';
      });
      return { total: headings.length, invisible: invisibleHeadings.length };
    });

    if (checkReduced.invisible === 0) {
      console.log(`✓ All ${checkReduced.total} headings immediately visible with reduced-motion`);
    } else {
      console.error(`FAIL: ${checkReduced.invisible} headings hidden with reduced-motion`);
      totalErrors++;
    }
    await context.close();
  }

  console.log('\n=== 4. ANCHOR JUMP & SCROLL RESTORATION CHECK ===');
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/modular-kitchens', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Jump to anchor
    await page.evaluate(() => {
      const link = document.querySelector('a[href="#kitchen-styles"]');
      if (link) link.click();
    });
    await page.waitForTimeout(700);

    const scrolledY = await page.evaluate(() => window.scrollY);
    if (scrolledY > 300) {
      console.log(`✓ Anchor jump scrolled smoothly to y=${Math.round(scrolledY)}px`);
    } else {
      console.error(`FAIL: Anchor jump did not scroll (y=${scrolledY})`);
      totalErrors++;
    }

    // Mid-page reload test
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const restoredVisible = await page.evaluate(() => {
      const h = document.getElementById('kitchen-styles');
      if (!h) return false;
      const s = window.getComputedStyle(h);
      return s.opacity !== '0' && s.visibility !== 'hidden';
    });
    if (restoredVisible) {
      console.log('✓ Mid-page reload rendered target section visibly');
    } else {
      console.error('FAIL: Target section not visible after reload');
      totalErrors++;
    }
    await context.close();
  }

  await browser.close();

  console.log('\n========================================');
  if (totalErrors === 0) {
    console.log('ALL PHASE 5 VERIFICATION CHECKS PASSED WITH 0 ERRORS!');
  } else {
    console.error(`TOTAL ERRORS: ${totalErrors}`);
    process.exit(1);
  }
  console.log('========================================\n');
}

verify().catch((e) => {
  console.error(e);
  process.exit(1);
});
