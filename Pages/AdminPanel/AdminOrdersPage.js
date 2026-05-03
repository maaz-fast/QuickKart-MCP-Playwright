export class AdminOrdersPage {
    constructor(page) {
        this.page = page;
        this.tableRows = page.locator('tbody tr');
    }

    async goto() {
        await this.page.goto('/admin/orders');
    }

    async updateOrderStatus(orderId, newStatus) {
        const row = this.tableRows.filter({ hasText: orderId });
        // Click custom div dropdown in the Status column
        await row.locator('td').nth(4).click(); 
        await this.page.locator(`div:text("${newStatus}")`).last().click();
    }

    async filterByStatus(status) {
        // Click custom header filter
        await this.page.locator('div:has-text("All Statuses")').first().click();
        await this.page.locator(`div:text("${status}")`).last().click();
    }
}
