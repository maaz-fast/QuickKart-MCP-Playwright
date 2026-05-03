export class AdminUsersPage {
    constructor(page) {
        this.page = page;
        this.userRows = page.locator('tbody tr');
    }

    async goto() {
        await this.page.goto('/admin/users');
    }

    async getUserCount() {
        return await this.userRows.count();
    }

    async getUserDetails(index = 0) {
        const row = this.userRows.nth(index);
        return {
            name: await row.locator('td').nth(1).innerText(),
            email: await row.locator('td').nth(2).innerText(),
            role: await row.locator('td').nth(3).innerText()
        };
    }
}
