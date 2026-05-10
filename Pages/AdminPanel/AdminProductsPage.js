import BasePage from '../BasePage.js';
import locators from '../../Locators/locators.js';

export class AdminProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = locators.admin.productsPage;
        this.productRows = page.locator(this.locators.tableRows.primary);
        
        // Form Fields (on /admin/products/add)
        this.form = {
            name: '[data-testid="product-name-input"]',
            description: '[data-testid="product-description-input"]',
            price: '[data-testid="product-price-input"]',
            stock: '[data-testid="product-stock-input"]',
            categoryDropdown: '[data-testid="category-dropdown-header"]',
            image: '[data-testid="product-image-input"]',
            submitBtn: '[data-testid="submit-button"]'
        };
    }

    async goto() {
        await this.page.goto('/admin/products');
        await this.waitForLoadingToFinish();
    }

    async clickAddProduct() {
        await this.click(this.locators.addProductBtn);
    }

    async addNewProduct(details) {
        await this.clickAddProduct();
        await this.fillProductForm(details);
    }

    async selectCategory(categoryName) {
        await this.click(this.form.categoryDropdown);
        await this.page.waitForSelector('.custom-select-options', { state: 'visible' });
        // Target the option explicitly within the custom-select-options container
        const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(categoryName, 'i') }).first();
        await this.click(option);
    }

    async fillProductForm(details) {
        await this.fill(this.form.name, details.name);
        await this.fill(this.form.description, details.description);
        await this.fill(this.form.price, details.price);
        await this.fill(this.form.stock, details.stock);
        await this.fill(this.form.image, details.image);
        
        // Handle custom dropdown
        await this.selectCategory(details.category);
        
        await this.click(this.form.submitBtn);
        await this.waitForLoadingToFinish();
    }

    async getProductCount() {
        return await this.page.locator(this.locators.tableRows.primary).count();
    }

    async getTotalProductCount() {
        const locator = 'p:has-text("Manage your store catalog")';
        await this.page.waitForSelector(locator, { state: 'visible' });
        const headerText = await this.getText(locator);
        // Extract number from "(61 items)" or "Manage your store catalog (61 items)"
        const match = headerText.match(/\((\d+)\s+items\)/);
        return match ? parseInt(match[1]) : 0;
    }

    async deleteProduct(index = 0) {
        const row = this.productRows.nth(index);
        const deleteBtn = row.locator(this.locators.deleteBtn);
        await this.click(deleteBtn);
        
        // Handle confirmation modal
        await this.click(this.locators.modalConfirmBtn);
        await this.waitForLoadingToFinish();
    }

    async clickEditProduct(index = 0) {
        const row = this.page.locator(this.locators.tableRows.primary).nth(index);
        const editBtn = row.locator(this.locators.editBtn).first();
        await this.click(editBtn);
    }

    async updateProductPrice(newPrice) {
        await this.fill(this.form.price, newPrice);
        await this.click(this.form.submitBtn);
        await this.waitForLoadingToFinish();
    }

    async searchProduct(name) {
        const searchBar = this.page.locator('input[placeholder*="Search"]');
        if (await this.isVisible(searchBar)) {
            await this.fill(searchBar, name);
        }
    }
}
