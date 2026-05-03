export class AdminSupportPage {
    constructor(page) {
        this.page = page;
        this.ticketRows = page.locator('tbody tr');
    }

    async goto() {
        await this.page.goto('/admin/support');
    }

    async resolveTicket(index = 0) {
        const row = this.ticketRows.nth(index);
        await row.locator('button:has-text("Resolve")').click();
    }

    async filterByStatus(status) {
        // Click custom header filter
        await this.page.locator('div:has-text("All Status")').first().click();
        await this.page.locator(`div:text("${status}")`).last().click();
    }
}
