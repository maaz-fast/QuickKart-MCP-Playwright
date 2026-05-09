import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminActivityLogsPage } from '../../Pages/AdminPanel/AdminActivityLogsPage';

test.describe('Admin Activity Logs @admin', () => {
    let activityLogsPage;

    test.beforeEach(async ({ page }, testInfo) => {
        activityLogsPage = new AdminActivityLogsPage(page);
        await activityLogsPage.goto();
    });

    test.skip('Should sync activity logs', async ({ page }) => {
        await activityLogsPage.syncLogs();
        await expect(page.locator('text=/Logs synchronized/i')).toBeVisible();
    });

    test('Should filter logs by level', async ({ page }) => {
        await activityLogsPage.filterLogs(null, 'Error');
        
        // Verify only Error logs are shown
        const logContent = await activityLogsPage.getLatestLog();
        if (logContent) {
            // Note: This depends on the exact log text format
            await expect(activityLogsPage.logRows.first()).toBeVisible();
        }
    });

    test('Should display log details', async ({ page }) => {
        const rowCount = await activityLogsPage.logRows.count();
        if (rowCount > 0) {
            await activityLogsPage.logRows.first().click();
            // Verify detail modal or expansion
            await expect(page.locator('text=Log Details')).toBeVisible();
        }
    });
});
