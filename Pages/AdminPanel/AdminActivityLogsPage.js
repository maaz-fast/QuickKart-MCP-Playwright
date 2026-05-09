import BasePage from '../BasePage.js';
import locators from '../../Locators/locators.js';

export class AdminActivityLogsPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = locators.admin.activityLogsPage;
        this.syncBtn = page.locator(this.locators.syncBtn.primary);
        this.logRows = page.locator(this.locators.tableRows.primary);
    }

    async goto() {
        await this.page.goto('/admin/activity-logs');
        await this.waitForLoadingToFinish();
    }

    async syncLogs() {
        await this.click(this.syncBtn);
    }

    async filterLogs(category, level) {
        if (category) {
            const categoryDropdown = this.page.locator(this.locators.categoryFilter.primary).locator('.custom-select-header');
            await this.click(categoryDropdown, { force: true });
            await this.page.waitForSelector('.custom-select-options', { state: 'visible', timeout: 5000 });
            const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(`^${category}$`) });
            await this.click(option.first(), { force: true });
        }
        if (level) {
            const levelDropdown = this.page.locator(this.locators.levelFilter.primary).locator('.custom-select-header');
            await this.click(levelDropdown, { force: true });
            await this.page.waitForSelector('.custom-select-options', { state: 'visible', timeout: 5000 });
            const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(`^${level}$`) });
            await this.click(option.first(), { force: true });
        }
        await this.waitForLoadingToFinish();
    }

    async getLatestLog() {
        return await this.getText(this.logRows.first());
    }
}
