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
        const filterDropdown = this.page.locator('div:text("Status") + *').first();
        await this.click(filterDropdown, { force: true });
        await this.page.waitForSelector('.custom-select-options', { state: 'visible', timeout: 5000 });
        const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(`^${status}$`) });
        await this.click(option.first(), { force: true });
        await this.waitForLoadingToFinish();
    }
}
