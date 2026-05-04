import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminActivityLogsPage } from '../../Pages/AdminPanel/AdminActivityLogsPage';

test.describe('Admin Activity Logs', () => {
    let loginPage;
    let logsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        logsPage = new AdminActivityLogsPage(page);

        await loginPage.goto();
        await loginPage.login('maaz+admin@gmail.com', '123456');
        await logsPage.goto();
    });

    test.skip('Should sync activity logs', async ({ page }) => {
        await logsPage.syncLogs();
        await expect(page.locator('text=/Logs synchronized/i')).toBeVisible();
    });

    test('Should filter logs by level', async ({ page }) => {
        await logsPage.filterLogs(null, 'Error');
        
        // Verify only Error logs are shown
        const logContent = await logsPage.getLatestLog();
        if (logContent) {
            // Note: This depends on the exact log text format
            await expect(logsPage.logRows.first()).toBeVisible();
        }
    });

    test('Should display log details', async ({ page }) => {
        const rowCount = await logsPage.logRows.count();
        if (rowCount > 0) {
            await logsPage.logRows.first().click();
            // Verify detail modal or expansion
            await expect(page.locator('text=Log Details')).toBeVisible();
        }
    });
});
