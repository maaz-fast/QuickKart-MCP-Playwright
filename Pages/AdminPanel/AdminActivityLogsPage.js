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
            await this.click(this.page.locator('div:has-text("All Activities")').first());
            await this.click(this.page.locator(`div:text("${category}")`).last());
        }
        if (level) {
            await this.click(this.page.locator('div:has-text("All Access Levels")').first());
            await this.click(this.page.locator(`div:text("${level}")`).last());
        }
        await this.waitForLoadingToFinish();
    }

    async getLatestLog() {
        return await this.getText(this.logRows.first());
    }
}
