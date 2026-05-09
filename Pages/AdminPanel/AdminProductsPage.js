import BasePage from '../BasePage.js';
import locators from '../../Locators/locators.js';

export class AdminProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = locators.admin.productsPage;
        
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

    async fillProductForm(details) {
        await this.fill(this.form.name, details.name);
        await this.fill(this.form.description, details.description);
        await this.fill(this.form.price, details.price);
        await this.fill(this.form.stock, details.stock);
        await this.fill(this.form.image, details.image);
        
        // Handle custom dropdown
        await this.click(this.form.categoryDropdown);
        // Wait for the dropdown options container to be visible
        const optionsContainer = this.page.locator('.custom-select-options');
        await this.page.waitForSelector('.custom-select-options', { state: 'visible', timeout: 5000 });
        
        const option = optionsContainer.locator('.custom-select-option').filter({ hasText: new RegExp(`^${details.category}$`) });
        await this.click(option.first(), { force: true });
        
        await this.click(this.form.submitBtn);
        await this.waitForLoadingToFinish();
    }

    async getProductCount() {
        return await this.page.locator(this.locators.tableRows.primary).count();
    }

    async deleteProduct(index = 0) {
        const row = this.page.locator(this.locators.tableRows.primary).nth(index);
        const deleteBtn = row.locator('button:has-text("Delete")');
        await this.click(deleteBtn);
        await this.waitForLoadingToFinish();
    }

    async clickEditProduct(index = 0) {
        const row = this.page.locator(this.locators.tableRows.primary).nth(index);
        const editBtn = row.locator('button:has-text("Edit")');
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
