import { test, expect, type Page } from '@playwright/test';

const routes = [
  '/',
  '/modular-kitchens',
  '/modular-wardrobes',
  '/about',
  '/contact',
  '/talk-to-us',
];

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('response', (res) => {
    if (res.status() >= 400) errors.push(`HTTP ${res.status()}: ${res.url()}`);
  });
  return errors;
}

async function scrollThrough(page: Page) {
  let guard = 0;
  let lastBottom = -1;

  while (guard < 20) {
    const bottom = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight
    );
    const y = await page.evaluate(() => window.scrollY);

    if (bottom - y < 10) {
      if (lastBottom === bottom) break;
      lastBottom = bottom;
      await page.waitForTimeout(600);
    }

    const step = Math.max(500, Math.ceil((bottom - y) / 5));
    await page.evaluate(
      (t) => window.scrollTo({ top: t, behavior: 'auto' }),
      Math.min(y + step, bottom)
    );
    await page.waitForTimeout(250);
    guard++;
  }

  const reached = await page.evaluate(() => window.scrollY);
  const finalBottom = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight
  );
  expect(Math.abs(reached - finalBottom)).toBeLessThan(50);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  await page.waitForTimeout(200);
}

for (const route of routes) {
  test(`route ${route} renders content and full-scrolls`, async ({ page }) => {
    test.setTimeout(120_000);
    const errors = await collectErrors(page);

    await page.goto(route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const bodyText = (await page.locator('body').innerText()).trim();
    expect(bodyText.length).toBeGreaterThan(50);

    const headingCount = await page.locator('h1, h2').count();
    expect(headingCount).toBeGreaterThan(0);

    await scrollThrough(page);

    expect(errors).toEqual([]);
  });
}
