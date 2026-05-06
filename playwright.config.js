import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './Tests',
  testMatch: '**/*.spec.js',
  fullyParallel: false,
  timeout: 60000,
  expect: {
    timeout: 15000,
  },
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    baseURL: 'https://quickkart-shop-nine.vercel.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: 'setup',
      testMatch: /admin\.setup\.js/,
    },
    {
      name: 'admin',
      testMatch: /AdminPanel\/.*\.spec\.js/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/admin.json',
      },
    },
    {
      name: 'chromium',
      testIgnore: /AdminPanel\/.*\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: undefined,
});
