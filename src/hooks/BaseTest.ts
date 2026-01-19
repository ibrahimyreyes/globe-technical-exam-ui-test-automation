import { BrowserContext, Page, expect } from '@playwright/test';
import { test as baseTest } from 'src/fixtures/fixture';

type HookFixture = {
  context: BrowserContext;
  page: Page;
};

export const test = baseTest.extend<HookFixture>({
  context: async ({ browser }, use) => {
    // This code runs before all tests
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    // This code runs before each test
    const page = await context.newPage();
    test.setTimeout(300000); // Set timeout for each test (300 seconds)
    await page.setViewportSize({ width: 1920, height: 1032 });
    page.setDefaultTimeout(60000); // Set timeout for action (60 seconds)
    page.setDefaultNavigationTimeout(60000); // Set timeout for navigating the page (60 seconds)
    await page.waitForLoadState('networkidle');
    await use(page);
    await page.close();
  }
});

export { expect };
