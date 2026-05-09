import BasePage from '../BasePage.js';
import locators from '../../Locators/locators.js';

export class AdminCategoriesPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = locators.admin.categoriesPage;
        this.pageContainer = page.locator(this.locators.page);
        this.nameInput = page.locator(this.locators.nameInput);
        this.addBtn = page.locator(this.locators.addBtn);
        this.tableRows = page.locator(this.locators.row);
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
        const deleteBtn = row.locator(this.locators.deleteBtn);
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
