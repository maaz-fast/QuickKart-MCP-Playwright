import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminOrdersPage } from '../../Pages/AdminPanel/AdminOrdersPage';

test.describe('Admin Orders Management', () => {
    let loginPage;
    let ordersPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        ordersPage = new AdminOrdersPage(page);

        await loginPage.goto();
        await loginPage.login('maaz+admin@gmail.com', '123456');
        await ordersPage.goto();
    });

    test('Should update order status', async ({ page }) => {
        // Get the first order ID from the table
        const firstRow = ordersPage.tableRows.first();
        const orderId = await firstRow.locator('td').nth(1).innerText();
        
        // Update status to Shipped
        await ordersPage.updateOrderStatus(orderId, 'Shipped');
        
        // Verify toast message
        await expect(page.locator('text=/Order status updated/i')).toBeVisible();
    });

    test('Should filter orders by status', async ({ page }) => {
        await ordersPage.filterByStatus('Delivered');
        
        // Verify all visible rows have 'Delivered' status
        const rowCount = await ordersPage.tableRows.count();
        if (rowCount > 0) {
            const statusTexts = await ordersPage.tableRows.locator('td').allInnerTexts();
            expect(statusTexts.every(t => t.includes('Delivered'))).toBe(true);
        }
    });
});
