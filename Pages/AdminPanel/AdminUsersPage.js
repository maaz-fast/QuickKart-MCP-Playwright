import BasePage from '../BasePage.js';

export class AdminUsersPage extends BasePage {
    constructor(page) {
        super(page);
        this.userRows = page.locator('tbody tr');
    }

    async goto() {
        await this.page.goto('/admin/users');
        await this.waitForLoadingToFinish();
    }

    async getUserCount() {
        await this.userRows.first().waitFor({ state: 'visible' });
        return await this.userRows.count();
    }

    async getUserDetails(index = 0) {
        const row = this.userRows.nth(index);
        return {
            name: await this.getText(row.locator('td').nth(1)),
            email: await this.getText(row.locator('td').nth(2)),
            role: await this.getText(row.locator('td').nth(3))
        };
    }
}
