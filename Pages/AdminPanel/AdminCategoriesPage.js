export class AdminCategoriesPage {
    constructor(page) {
        this.page = page;
        this.nameInput = page.locator('input#categoryName');
        this.addBtn = page.locator('button:has-text("Add Category")');
        this.tableRows = page.locator('tbody tr');
    }

    async goto() {
        await this.page.goto('/admin/categories');
    }

    async addCategory(name) {
        await this.nameInput.fill(name);
        await this.addBtn.click();
    }

    async deleteCategory(name) {
        const row = this.tableRows.filter({ hasText: name });
        await row.locator('button.btn-error').click();
    }

    async getCategoryNames() {
        return await this.tableRows.locator('td:first-child').allInnerTexts();
    }
}
