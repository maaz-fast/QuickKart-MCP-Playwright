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
        await activityLogsPage.filterLogs(null, 'Admin Actions');
        
        // Verify list is filtered (rows should contain ADMIN)
        const rowCount = await activityLogsPage.logRows.count();
        if (rowCount > 0) {
            await expect(activityLogsPage.logRows.first()).toContainText('ADMIN');
        }
    });

    test('Should display log details', async ({ page }) => {
        const rowCount = await activityLogsPage.logRows.count();
        if (rowCount > 0) {
            // Verify that the first row has details text (column 5)
            const details = await activityLogsPage.logRows.first().locator('td').nth(4).innerText();
            expect(details.length).toBeGreaterThan(0);
        }
    });
});
