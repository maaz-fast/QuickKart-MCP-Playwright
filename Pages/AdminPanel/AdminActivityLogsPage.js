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
            await this.click(this.locators.categoryFilter);
            await this.page.waitForSelector('.custom-select-options', { state: 'visible' });
            const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(category, 'i') }).first();
            await this.click(option);
        }
        if (level) {
            await this.click(this.locators.levelFilter);
            await this.page.waitForSelector('.custom-select-options', { state: 'visible' });
            const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(level, 'i') }).first();
            await this.click(option);
        }
        await this.waitForLoadingToFinish();
    }

    async getLatestLog() {
        return await this.getText(this.logRows.first());
    }

    async getTotalLogCount() {
        const headerText = await this.getText('p:has-text("Tracking")');
        // Extract number from "Tracking 3049 critical business events"
        const match = headerText.match(/Tracking\s+(\d+)/i);
        return match ? parseInt(match[1]) : 0;
    }
}
