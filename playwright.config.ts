import os from 'os';
import { defineConfig, devices } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import { Constants } from './src/utilities/constants';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

dotenvConfig();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// Set the percentage you want (e.g., 75%)
const percentage = 0.75;
const cpuCount = os.cpus().length;
const seventyFive_percent_workers = Math.max(1, Math.floor(cpuCount * percentage));

// display cpu count and workers count
// console.log(`CPU Count: ${cpuCount}, Workers set to: ${seventyFive_percent_workers}`);

export default defineConfig({
  testDir: './src/tests/testsuites/',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1, // process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: seventyFive_percent_workers, // process.env.CI ? 2 : undefined, //workers,//
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['junit', { outputFile: 'xml-reports/junit-results.xml' }],
    [
      'allure-playwright',
      {
        links: {
          issue: {
            nameTemplate: 'Issue #%s',
            urlTemplate: 'https://example.com/%s'
          },
          tms: {
            nameTemplate: 'TMS #%s',
            urlTemplate: 'https://example.com/%s'
          },
          link: {
            nameTemplate: 'Link #%s',
            urlTemplate: 'https://example.com/%s'
          }
        }
      }
    ],
    // /* customOption */
    ['./src/utilities/logger-utils/steps-logger/StepLoggerReporter.ts', { customOption: 'Spree Commerce DEMO' }]
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. */
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    },
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        testIdAttribute: 'data-test',
        userAgent: Constants.AUTOMATION_USER_AGENT,
        // Set the storage state here if you have only one user to login.
        // storageState: STORAGE_STATE_LOGIN,
        launchOptions: {
          args: ['--use-gl=egl', '--disable-web-security', '--start-maximized', '--no-sandbox', '--disable-blink-features=AutomationControlled',
            '--disable-dev-shm-usage'],
          headless: process.env.BROWSER_MODE === 'headed' ? false : true
        }
      }
    },
    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Edge'],
        channel: 'msedge',
        launchOptions: {
          args: ['--use-gl=egl', '--disable-web-security', '--start-maximized', '--no-sandbox', '--disable-blink-features=AutomationControlled',
            '--disable-dev-shm-usage'],
          headless: process.env.BROWSER_MODE === 'headed' ? false : true
        }
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox'],
        channel: 'firefox',
        launchOptions: {
          args: ['--disable-web-security'],
          headless: process.env.BROWSER_MODE === 'headed' ? false : true
        }
      }
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        ...devices['Desktop Safari'],
        channel: 'webkit',
        viewport: { width: 1920, height: 1032 },
        deviceScaleFactor: 1, // Zoom out by reducing the scale factor
        launchOptions: {
          headless: process.env.BROWSER_MODE === 'headed' ? false : true
        }
      }
    }
  ]
});
