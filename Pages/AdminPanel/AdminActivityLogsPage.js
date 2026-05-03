export class AdminActivityLogsPage {
    constructor(page) {
        this.page = page;
        this.syncBtn = page.locator('button:has-text("Sync Logs")');
        this.logRows = page.locator('tbody tr');
    }

    async goto() {
        await this.page.goto('/admin/activity-logs');
    }

    async syncLogs() {
        await this.syncBtn.click();
    }

    async filterLogs(category, level) {
        if (category) {
            await this.page.locator('div:has-text("All Activities")').first().click();
            await this.page.locator(`div:text("${category}")`).last().click();
        }
        if (level) {
            await this.page.locator('div:has-text("All Access Levels")').first().click();
            await this.page.locator(`div:text("${level}")`).last().click();
        }
    }

    async getLatestLog() {
        return await this.logRows.first().innerText();
    }
}
