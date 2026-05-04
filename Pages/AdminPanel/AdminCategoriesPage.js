import BasePage from '../BasePage.js';

export class AdminCategoriesPage extends BasePage {
    constructor(page) {
        super(page);
        this.nameInput = page.locator('input#categoryName');
        this.addBtn = page.locator('button:has-text("Add Category")');
        this.tableRows = page.locator('tbody tr');
    }

    async goto() {
        await this.page.goto('/admin/categories');
        await this.waitForLoadingToFinish();
    }

    async addCategory(name) {
        await this.fill(this.nameInput, name);
        await this.click(this.addBtn);
        await this.waitForLoadingToFinish();
    }

    async deleteCategory(name) {
        const row = this.tableRows.filter({ hasText: name });
        await this.click(row.locator('button.btn-error'));
        await this.waitForLoadingToFinish();
    }

    async getCategoryNames() {
        return await this.getAllText(this.tableRows.locator('td:first-child'));
    }
}
