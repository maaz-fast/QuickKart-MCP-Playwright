import BasePage from '../BasePage.js';
import locators from '../../Locators/locators.js';

export class AdminSupportPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = locators.admin.supportPage;
        this.ticketRows = page.locator(this.locators.tableRows.primary);
    }

    async goto() {
        await this.page.goto('/admin/support');
        await this.waitForLoadingToFinish();
    }

    async resolveTicket(index = 0) {
        const row = this.ticketRows.nth(index);
        await this.click(row.locator(this.locators.resolveBtn));
        await this.waitForLoadingToFinish();
    }

    async filterByStatus(status) {
        // Click custom header filter
        const filterWrapper = this.page.locator(this.locators.statusFilter).first();
        const filterDropdown = filterWrapper.locator('.custom-select-header');
        await this.click(filterDropdown, { force: true });
        await this.page.waitForSelector('.custom-select-options', { state: 'visible', timeout: 5000 });
        const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(`^${status}$`) });
        await this.click(option.first(), { force: true });
        await this.waitForLoadingToFinish();
    }

    async getPendingTicketCount() {
        const selector = '[data-testid="admin-nav-support"]';
        await this.page.waitForSelector(selector, { state: 'visible' });
        const badgeText = await this.getText(selector);
        // Robust regex to find a number after "Support"
        const match = badgeText.match(/Support\s*(\d+)/i);
        return match ? parseInt(match[1]) : 0;
    }
}
