import { test, type Page } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';

const routes = [
  '/',
  '/modular-kitchens',
  '/modular-wardrobes',
  '/about',
  '/contact',
  '/talk-to-us',
];

interface RouteAudit {
  route: string;
  title: string;
  bodyLength: number;
  h1: string[];
  h2: string[];
  sections: { tag: string; id: string; aria: string }[];
  consoleErrors: string[];
  pageErrors: string[];
  httpErrors: { status: number; url: string }[];
  requestFailures: string[];
  imagesWithoutAlt: string[];
  brokenAnchors: string[];
  links: string[];
  scrollHeight: number;
  finalScrollY: number;
  screenshots: string[];
}

const results: RouteAudit[] = [];

function routeName(route: string): string {
  return route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '') || 'root';
}

async function scrollAndCapture(page: Page, route: string): Promise<{
  screenshots: string[];
  finalScrollY: number;
  scrollHeight: number;
}> {
  const name = routeName(route);
  const dir = `test-results/audit/${name}`;
  mkdirSync(dir, { recursive: true });
  const screenshots: string[] = [];

  await page.waitForTimeout(1500);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.max(400, Math.floor(total / 5));

  for (let i = 1; i <= 5; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.min(step * i, total));
    await page.waitForTimeout(700);
    const shot = path.join(dir, `scroll-${i}.png`);
    await page.screenshot({ path: shot });
    screenshots.push(shot);
  }

  const full = path.join(dir, 'full.png');
  await page.screenshot({ path: full, fullPage: true });
  screenshots.push(full);

  const finalScrollY = await page.evaluate(() => window.scrollY);
  await page.evaluate(() => window.scrollTo(0, 0));

  return { screenshots, finalScrollY, scrollHeight: total };
}

for (const route of routes) {
  test(`audit ${route}`, async ({ page }) => {
    test.setTimeout(180_000);

    const audit: RouteAudit = {
      route,
      title: '',
      bodyLength: 0,
      h1: [],
      h2: [],
      sections: [],
      consoleErrors: [],
      pageErrors: [],
      httpErrors: [],
      requestFailures: [],
      imagesWithoutAlt: [],
      brokenAnchors: [],
      links: [],
      scrollHeight: 0,
      finalScrollY: 0,
      screenshots: [],
    };

    page.on('console', (msg) => {
      if (msg.type() === 'error') audit.consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => audit.pageErrors.push(err.message));
    page.on('response', (res) => {
      if (res.status() >= 400) audit.httpErrors.push({ status: res.status(), url: res.url() });
    });
    page.on('requestfailed', (req) => audit.requestFailures.push(`${req.url()} (${req.failure()?.errorText})`));

    await page.goto(route, { waitUntil: 'load' });
    await page.waitForTimeout(route === '/' ? 4500 : 1800);

    audit.title = await page.title();
    audit.bodyLength = (await page.locator('body').innerText()).trim().length;

    audit.h1 = await page.locator('h1').allInnerTexts();
    audit.h2 = await page.locator('h2').allInnerTexts();
    audit.sections = await page.locator('section').evaluateAll((secs) =>
      secs.map((s) => ({
        tag: s.tagName,
        id: s.id,
        aria: s.getAttribute('aria-label') || '',
      }))
    );
    audit.imagesWithoutAlt = await page.locator('img:not([alt])').evaluateAll((imgs) =>
      imgs.map((i) => (i as HTMLImageElement).src).filter((s) => s)
    );
    audit.brokenAnchors = await page
      .locator('a[href="#"], a[href=""], a[href="#privacy"], a[href="#terms"]')
      .evaluateAll((a) => a.map((el) => (el as HTMLAnchorElement).getAttribute('href') || ''));
    audit.links = await page.locator('a[href]').evaluateAll((a) =>
      a.map((el) => (el as HTMLAnchorElement).getAttribute('href') || '')
    );

    const cap = await scrollAndCapture(page, route);
    audit.screenshots = cap.screenshots;
    audit.finalScrollY = cap.finalScrollY;
    audit.scrollHeight = cap.scrollHeight;

    results.push(audit);
  });
}

test.afterAll(() => {
  mkdirSync('test-results/audit', { recursive: true });
  writeFileSync('test-results/audit/summary.json', JSON.stringify(results, null, 2), 'utf-8');

  let report = '# LEOZ CUCINE — Live Browser Audit\n\n';
  for (const r of results) {
    report += `## ${r.route}\n`;
    report += `- Title: ${r.title}\n`;
    report += `- Body chars: ${r.bodyLength}, scrollHeight: ${r.scrollHeight}\n`;
    report += `- H1: ${r.h1.join(' | ') || '(none)'}\n`;
    if (r.consoleErrors.length) report += `- Console errors (${r.consoleErrors.length}): ${r.consoleErrors.join(' | ')}\n`;
    if (r.pageErrors.length) report += `- Page errors (${r.pageErrors.length}): ${r.pageErrors.join(' | ')}\n`;
    if (r.httpErrors.length) report += `- HTTP >=400 (${r.httpErrors.length}): ${r.httpErrors.map((e) => `${e.status} ${e.url}`).join(' | ')}\n`;
    if (r.requestFailures.length) report += `- Request failures: ${r.requestFailures.join(' | ')}\n`;
    if (r.imagesWithoutAlt.length) report += `- Images without alt (${r.imagesWithoutAlt.length}): ${r.imagesWithoutAlt.join(' | ')}\n`;
    if (r.brokenAnchors.length) report += `- Dead anchors: ${r.brokenAnchors.join(' | ')}\n`;
    report += '\n';
  }
  writeFileSync('test-results/audit/REPORT.md', report, 'utf-8');
});
