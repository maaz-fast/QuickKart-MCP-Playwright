import BasePage from '../BasePage.js';

export class AdminSupportPage extends BasePage {
    constructor(page) {
        super(page);
        this.ticketRows = page.locator('tbody tr');
    }

    async goto() {
        await this.page.goto('/admin/support');
        await this.waitForLoadingToFinish();
    }

    async resolveTicket(index = 0) {
        const row = this.ticketRows.nth(index);
        await this.click(row.locator('button:has-text("Resolve")'));
        await this.waitForLoadingToFinish();
    }

    async filterByStatus(status) {
        // Click custom header filter
        await this.click(this.page.locator('div:has-text("All Status")').first());
        await this.click(this.page.locator(`div:text("${status}")`).last());
        await this.waitForLoadingToFinish();
    }
}
