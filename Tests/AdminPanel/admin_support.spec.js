import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminSupportPage } from '../../Pages/AdminPanel/AdminSupportPage';

test.describe('Admin Support Management @admin', () => {
    let supportPage;

    test.beforeEach(async ({ page }, testInfo) => {
        supportPage = new AdminSupportPage(page);
        await supportPage.skipOnRetry(testInfo);
        await supportPage.goto();
    });

    test('Should resolve a support ticket', async ({ page }) => {
        // Filter by Pending to ensure we have one to resolve
        await supportPage.filterByStatus('Pending');
        
        const initialCount = await supportPage.ticketRows.count();
        if (initialCount > 0) {
            await supportPage.resolveTicket(0);
            await expect(page.locator('text=Ticket resolved')).toBeVisible();
            
            // Should now be fewer pending tickets
            await page.waitForTimeout(1000); // Wait for list refresh
            const finalCount = await supportPage.ticketRows.count();
            expect(finalCount).toBeLessThan(initialCount);
        }
    });

    test('Should filter tickets by status', async ({ page }) => {
        await supportPage.filterByStatus('Resolved');
        // Verify list is filtered
        await expect(page.locator('tbody')).toContainText('Undo'); // 'Undo' only appears for resolved
    });
});
