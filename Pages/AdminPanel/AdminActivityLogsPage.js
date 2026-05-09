import BasePage from '../BasePage.js';

export class AdminActivityLogsPage extends BasePage {
    constructor(page) {
        super(page);
        this.syncBtn = page.locator('button:has-text("Sync Logs")');
        this.logRows = page.locator('tbody tr');
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
            const categoryDropdown = this.page.locator('div:text("Activity Category") + *').first();
            await this.click(categoryDropdown, { force: true });
            await this.page.waitForSelector('.custom-select-options', { state: 'visible', timeout: 5000 });
            const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(`^${category}$`) });
            await this.click(option.first(), { force: true });
        }
        if (level) {
            const levelDropdown = this.page.locator('div:text("Access Level") + *').first();
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
