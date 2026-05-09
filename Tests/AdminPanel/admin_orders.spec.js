import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminOrdersPage } from '../../Pages/AdminPanel/AdminOrdersPage';

test.describe('Admin Order Management @admin', () => {
    let ordersPage;

    test.beforeEach(async ({ page }, testInfo) => {
        ordersPage = new AdminOrdersPage(page);
        page.on('dialog', dialog => dialog.accept());
        await ordersPage.goto();
    });

    test('Should update order status', async ({ page }) => {
        // Find the first order that is NOT 'Delivered' (since Delivered orders are disabled for update)
        const row = ordersPage.tableRows.filter({ hasNot: page.locator('text=Delivered') }).first();
        const orderId = await row.locator('td').nth(1).innerText();
        const currentStatus = await row.locator('[data-testid="status-badge"]').innerText();
        const targetStatus = 'Shipped';
        
        // Update status
        await ordersPage.updateOrderStatus(orderId, targetStatus);
        
        // Verify status in table
        const verificationRow = ordersPage.tableRows.filter({ hasText: orderId });
        await expect(verificationRow.locator('[data-testid="status-badge"]')).toContainText(targetStatus);
    });

    test('Should filter orders by status', async ({ page }) => {
        await ordersPage.filterByStatus('Delivered');
        
        // Verify all visible rows have 'Delivered' status
        const rowCount = await ordersPage.tableRows.count();
        for (let i = 0; i < rowCount; i++) {
            const status = await ordersPage.tableRows.nth(i).locator('[data-testid="status-badge"]').innerText();
            expect(status).toContain('Delivered');
        }
    });
});
