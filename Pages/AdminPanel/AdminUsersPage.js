import BasePage from '../BasePage.js';
import locators from '../../Locators/locators.js';

export class AdminUsersPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = locators.admin.usersPage;
    }

    async goto() {
        await this.page.goto('/admin/users');
        await this.waitForLoadingToFinish(this.locators.tableRows.primary);
    }

    async getUserCount() {
        return await this.page.locator(this.locators.tableRows.primary).count();
    }

    async getUserDetails(index = 0) {
        const row = this.page.locator(this.locators.tableRows.primary).nth(index);
        return {
            name: await this.getText(row.locator(this.locators.userName)),
            email: await this.getText(row.locator(this.locators.userEmail)),
            role: await this.getText(row.locator(this.locators.userRole))
        };
    }
}
