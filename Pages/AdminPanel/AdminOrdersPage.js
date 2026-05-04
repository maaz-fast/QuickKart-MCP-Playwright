import BasePage from '../BasePage.js';

export class AdminOrdersPage extends BasePage {
    constructor(page) {
        super(page);
        this.tableRows = page.locator('tbody tr');
    }

    async goto() {
        await this.page.goto('/admin/orders');
        await this.waitForLoadingToFinish();
    }

    async updateOrderStatus(orderId, newStatus) {
        const row = this.tableRows.filter({ hasText: orderId });
        // Click custom div dropdown in the Status column
        await this.click(row.locator('td').nth(4)); 
        await this.click(this.page.locator(`div:text("${newStatus}")`).last());
        await this.waitForLoadingToFinish();
    }

    async filterByStatus(status) {
        // Click custom header filter
        await this.click(this.page.locator('div:has-text("All Statuses")').first());
        await this.click(this.page.locator(`div:text("${status}")`).last());
        await this.waitForLoadingToFinish();
    }
}
