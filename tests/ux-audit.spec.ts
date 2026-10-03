import { test, Page, devices } from '@playwright/test';
import { mkdirSync, writeFileSync, readdirSync, readFileSync, existsSync } from 'fs';
import path from 'path';

const routes = [
  '/',
  '/modular-kitchens',
  '/modular-wardrobes',
  '/about',
  '/contact',
  '/talk-to-us',
  '/franchise-enquiry',
];

const viewports = {
  desktop: { name: 'desktop', width: 1920, height: 1080 },
  mobile: { name: 'mobile', width: 390, height: 844 },
};

interface SectionInfo {
  index: number;
  id: string;
  className: string;
  heading: string;
  headingAlign: string;
  introAlign: string;
  headingAnimatedStart: boolean;
  headingStuck: boolean;
  introStuck: boolean;
}

interface PageInfo {
  route: string;
  viewport: string;
  scrollReached: boolean;
  scrollHeight: number;
  finalScrollY: number;
  horizontalOverflow: boolean;
  scrollJitter: number; // max downward jump (jank/teleport)
  sections: SectionInfo[];
  stuckAnimatedText: string[];
  cardRowsEqual: string[];
  cardRowsUnequal: string[];
  consoleErrors: string[];
}

const results: PageInfo[] = [];

const DATA_DIR = 'test-results/ux/data';

function routeName(route: string): string {
  return route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '') || 'root';
}

function uid(route: string, viewport: string): string {
  return `${routeName(route)}-${viewport}`;
}

const CARD_GRID_SELECTORS = [
  '.home-categories-grid',
  '.home-projects-grid',
  '.home-pillars-grid',
  '.about-quality-grid',
  '.contact-details-grid',
  '.mk-layouts-grid',
  '.mk-materials-grid',
  '.mk-process-grid',
  '.mk-portfolio-grid',
  '.mw-layouts-grid',
  '.mw-fittings-grid',
  '.mw-materials-grid',
  '.why-partner-grid',
  '.ideal-partners-grid',
  '.advantage-grid',
  '.timeline-steps-grid',
];

async function measureScroll(page: import('@playwright/test').Page, info: PageInfo) {
  // Sample scroll while driving to bottom to detect jank/teleporting
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const bottom = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight
  );
  const step = Math.max(400, Math.floor(bottom / 7));
  let lastY = 0;
  const jumps: number[] = [];

  let guard = 0;
  while (guard < 30) {
    const y = await page.evaluate(() => window.scrollY);
    jumps.push(y - lastY);
    lastY = y;
    if (y >= bottom - 10) break;
    await page.evaluate((t) => window.scrollBy({ top: t, behavior: 'auto' }), step);
    await page.waitForTimeout(120);
    guard++;
  }

  info.finalScrollY = await page.evaluate(() => window.scrollY);
  info.scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  info.scrollReached = info.finalScrollY >= bottom - 10;
  info.horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth > 1
  );
  // Negative downward jump much larger than the fixed step signals jank/teleport
  info.scrollJitter = Math.max(0, ...jumps.map((j) => -j));
}

async function auditSections(page: import('@playwright/test').Page, info: PageInfo) {
  const data = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section'));
    return sections.map((sec, i) => {
      const heading = sec.querySelector('h1, h2') as HTMLElement | null;
      const para = Array.from(sec.querySelectorAll('p')).find((p) => {
        const hero = sec.querySelector('h1, h2');
        return hero && p.compareDocumentPosition(hero as Node) & Node.DOCUMENT_POSITION_FOLLOWING;
      }) as HTMLElement | null;

      // Alignment measured relative to the section's content box
      const secRect = sec.getBoundingClientRect();
      const hasHead = Boolean(heading);
      const hasPara = Boolean(para);
      return {
        i,
        id: sec.id || '',
        cls: (sec.className as string) || '',
        heading: heading ? (heading.textContent || '').trim().slice(0, 60) : '',
        hasHead,
        hasPara,
        secLeft: secRect.left,
        secWidth: secRect.width,
        headTextAlign: heading ? getComputedStyle(heading).textAlign : '',
        headLeft: heading ? heading.getBoundingClientRect().left : -1,
        headWidth: heading ? heading.getBoundingClientRect().width : 0,
        paraTextAlign: para ? getComputedStyle(para).textAlign : '',
        paraLeft: para ? para.getBoundingClientRect().left : -1,
        paraWidth: para ? para.getBoundingClientRect().width : 0,
        headClip: heading ? getComputedStyle(heading).clipPath : '',
        headOpacity: heading ? getComputedStyle(heading).opacity : '',
        paraOpacity: para ? getComputedStyle(para).opacity : '',
      };
    });
  });

  data.forEach((s) => {
    const headAlign = s.hasHead
      ? s.headWidth > 0 && Math.abs(s.headLeft - s.secLeft) < 4
        ? 'left'
        : s.headWidth > 0 && Math.abs(s.headLeft - (s.secLeft + (s.secWidth - s.headWidth) / 2)) < 4
          ? 'center'
          : s.headTextAlign || 'other'
      : 'none';
    const paraAlign = s.hasPara
      ? s.paraWidth > 0 && Math.abs(s.paraLeft - s.secLeft) < 4
        ? 'left'
        : s.paraWidth > 0 && Math.abs(s.paraLeft - (s.secLeft + (s.secWidth - s.paraWidth) / 2)) < 4
          ? 'center'
          : s.paraTextAlign || 'other'
      : 'none';

    const headingAnimStart = s.hasHead && (parseFloat(s.headOpacity) < 0.5 || s.headClip.includes('100%') || s.headClip.includes('0%'));

    info.sections.push({
      index: s.i,
      id: s.id,
      className: s.cls,
      heading: s.hasHead ? s.heading : '(h1/h2 not present)',
      headingAlign: headAlign,
      introAlign: paraAlign,
      headingAnimatedStart: headingAnimStart,
      headingStuck: false,
      introStuck: false,
    });
  });
}

async function checkStuckAfterReveal(page: import('@playwright/test').Page, info: PageInfo) {
  // Scroll each section fully into view (with margin) and check headings/paragraphs settle to visible
  const sectionCount = await page.locator('section').count();
  for (let i = 0; i < sectionCount; i++) {
    const sec = page.locator('section').nth(i);
    await sec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    const stuck = sec.evaluate((el) => {
      const heads = Array.from(el.querySelectorAll('h1, h2')).map((h) => ({
        opacity: parseFloat(getComputedStyle(h).opacity),
        clip: getComputedStyle(h).clipPath,
      }));
      const paras = Array.from(el.querySelectorAll('p')).map((p) => ({
        opacity: parseFloat(getComputedStyle(p).opacity),
      }));
      const stuckHead = heads.filter(
        (h) => h.opacity < 0.3 || (h.clip.includes('100%') && !h.clip.includes('0%'))
      ).length;
      const stuckPara = paras.filter((p) => p.opacity < 0.3).length;
      return { stuckHead, stuckPara };
    });

    if (stuck.stuckHead > 0 || stuck.stuckPara > 0) {
      info.stuckAnimatedText.push(
        `#${i} (${info.sections[i]?.heading || '?'}): stuckHead=${stuck.stuckHead} stuckPara=${stuck.stuckPara}`
      );
    }
  }
}

async function checkCardRows(page: import('@playwright/test').Page, info: PageInfo) {
  const gridClasses: string[] = [];
  for (const sel of CARD_GRID_SELECTORS) {
    if ((await page.locator(sel).count()) > 0) gridClasses.push(sel);
  }
  for (const gridSel of gridClasses) {
    const grids = page.locator(gridSel);
    const gridCount = await grids.count();
    for (let g = 0; g < gridCount; g++) {
      const grid = grids.nth(g);
      await grid.scrollIntoViewIfNeeded();
      // Wait for staggered reveals to fully settle then confirm stable
      await page.waitForTimeout(1600);
      const rows = await grid.evaluate((el) => {
        const rects = Array.from(el.children)
          .filter((c) => c.getClientRects().length > 0)
          .map((c) => c.getBoundingClientRect());
        if (rects.length === 0) return { rows: [] };
        // Cluster cards into visual rows by top (allow 4px tolerance)
        const sorted = [...rects].sort((a, b) => a.top - b.top);
        const rows: { top: number; heights: number[] }[] = [];
        for (const r of sorted) {
          const row = rows.find((x) => Math.abs(x.top - r.top) < 4);
          if (row) row.heights.push(Math.round(r.height));
          else rows.push({ top: r.top, heights: [Math.round(r.height)] });
        }
        return {
          rows: rows.map((row) => ({
            count: row.heights.length,
            distinctHeights: [...new Set(row.heights)],
            maxDelta: Math.max(...row.heights) - Math.min(...row.heights),
          })),
        };
      });
      if (!rows.rows) continue;
      const bad = rows.rows.filter((row) => row.count > 1 && row.maxDelta > 3);
      const good = rows.rows.filter((row) => row.count > 1 && row.maxDelta <= 3);
      if (bad.length === 0) info.cardRowsEqual.push(gridSel);
      else
        info.cardRowsUnequal.push(
          `${gridSel} [g${g}] rows=${rows.rows.map((r) => `${r.count}@${r.maxDelta}px`).join(' | ')}`
        );
    }
  }
}

for (const route of routes) {
  for (const vp of Object.values(viewports)) {
    test(`ux audit ${route} @ ${vp.name}`, async ({ browser }) => {
      test.setTimeout(180_000);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      const info: PageInfo = {
        route,
        viewport: vp.name,
        scrollReached: false,
        scrollHeight: 0,
        finalScrollY: 0,
        horizontalOverflow: false,
        scrollJitter: 0,
        sections: [],
        stuckAnimatedText: [],
        cardRowsEqual: [],
        cardRowsUnequal: [],
        consoleErrors: [],
      };

      page.on('console', (msg) => {
        if (msg.type() === 'error') info.consoleErrors.push(msg.text());
      });

      await page.goto(route, { waitUntil: 'load' });
      await page.waitForTimeout(route === '/' ? 4500 : 1800);

      await measureScroll(page, info);
      await auditSections(page, info);
      await checkStuckAfterReveal(page, info);
      await checkCardRows(page, info);

      // Screenshot a representative scroll position
      const dir = `test-results/ux/${routeName(route)}`;
      mkdirSync(dir, { recursive: true });
      await page.screenshot({ path: path.join(dir, `${vp.name}.png`) });

      // Persist per-test so every worker's data survives (cross-worker aggregation)
      mkdirSync(DATA_DIR, { recursive: true });
      writeFileSync(path.join(DATA_DIR, `${uid(route, vp.name)}.json`), JSON.stringify(info, null, 2), 'utf-8');

      await context.close();
    });
  }
}

test.afterAll(() => {
  mkdirSync('test-results/ux', { recursive: true });

  // Aggregate every worker's written results from disk
  const collected: PageInfo[] = [];
  if (existsSync(DATA_DIR)) {
    for (const f of readdirSync(DATA_DIR)) {
      if (f.endsWith('.json')) {
        try {
          collected.push(JSON.parse(readFileSync(path.join(DATA_DIR, f), 'utf-8')));
        } catch {
          /* ignore corrupt partial files */
        }
      }
    }
  }
  collected.sort((a, b) => a.route.localeCompare(b.route) || a.viewport.localeCompare(b.viewport));
  writeFileSync('test-results/ux/summary.json', JSON.stringify(collected, null, 2), 'utf-8');

  let report = '# LEOZ CUCINE — UX Playwright Audit (Scrolling / Alignment / Animation)\n\n';
  for (const r of collected) {
    report += `## ${r.route} [${r.viewport}]\n`;
    report += `- Scroll reached bottom: ${r.scrollReached} (final=${r.finalScrollY}, h=${r.scrollHeight})\n`;
    report += `- Horizontal overflow: ${r.horizontalOverflow}\n`;
    report += `- Scroll jitter (max downward jump): ${r.scrollJitter}px\n`;
    if (r.consoleErrors.length) report += `- Console errors (${r.consoleErrors.length})\n`;

    report += `\nSections (heading / headAlign / paraAlign / animStart):`;
    for (const s of r.sections) {
      report += `\n  #${s.index} [${s.id || s.className}] "${s.heading}" | head=${s.headingAlign} body=${s.introAlign} anim=${s.headingAnimatedStart}`;
    }

    if (r.stuckAnimatedText.length) {
      report += `\n\nStuck (never-revealed) animated text:`;
      for (const s of r.stuckAnimatedText) report += `\n  - ${s}`;
    }
    if (r.cardRowsUnequal.length) {
      report += `\n\nUnequal card rows:`;
      for (const c of r.cardRowsUnequal) report += `\n  - ${c}`;
    }
    if (r.cardRowsEqual.length) {
      report += `\nEqual-height card rows (${r.cardRowsEqual.length}): ${r.cardRowsEqual.join(', ')}`;
    }
    report += '\n';
  }
  writeFileSync('test-results/ux/REPORT.md', report, 'utf-8');
});