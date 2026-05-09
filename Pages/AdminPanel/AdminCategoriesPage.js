import BasePage from '../BasePage.js';

export class AdminCategoriesPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageContainer = page.locator('[data-testid="admin-categories-page"]');
        this.nameInput = page.locator('[data-testid="new-category-input"]');
        this.addBtn = page.locator('[data-testid="add-category-btn"]');
        this.tableRows = page.locator('[data-testid^="category-row-"]');
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
        const deleteBtn = row.locator('[data-testid^="delete-category-"]');
        await this.click(deleteBtn, { force: true });
        
        // Handle custom modal
        const confirmBtn = this.page.locator('button:has-text("Delete Category")').last();
        await this.click(confirmBtn);
        await this.waitForLoadingToFinish();
    }

    async getCategoryNames() {
        return await this.getAllText(this.tableRows.locator('td:first-child'));
    }
}
