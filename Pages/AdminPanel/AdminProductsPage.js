import BasePage from '../BasePage.js';

export class AdminProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.addProductBtn = page.locator('a:has-text("Add Product")');
        this.tableRows = page.locator('tbody tr');
        
        // Form Fields (on /admin/products/add)
        this.form = {
            name: page.locator('input#name'),
            description: page.locator('textarea#description'),
            price: page.locator('input#price'),
            stock: page.locator('input#stock'),
            categoryDropdown: page.locator('div:has(> span:text("Select a Category"))'),
            image: page.locator('input#image'),
            submitBtn: page.locator('button.btn-primary:has-text("Create Product")')
        };
    }

    async goto() {
        await this.page.goto('/admin/products');
        await this.waitForLoadingToFinish();
    }

    async clickAddProduct() {
        await this.click(this.addProductBtn);
    }

    async fillProductForm(details) {
        await this.fill(this.form.name, details.name);
        await this.fill(this.form.description, details.description);
        await this.fill(this.form.price, details.price);
        await this.fill(this.form.stock, details.stock);
        await this.fill(this.form.image, details.image);
        
        // Handle custom dropdown
        await this.click(this.form.categoryDropdown);
        await this.click(this.page.locator(`div:has-text("${details.category}")`).last());
        
        await this.click(this.form.submitBtn);
        await this.waitForLoadingToFinish();
    }

    async getProductCount() {
        return await this.tableRows.count();
    }

    async deleteProduct(index = 0) {
        const deleteBtn = this.tableRows.nth(index).locator('button:has-text("Delete")');
        await this.click(deleteBtn);
        await this.waitForLoadingToFinish();
    }

    async clickEditProduct(index = 0) {
        const editBtn = this.tableRows.nth(index).locator('button:has-text("Edit")');
        await this.click(editBtn);
    }

    async updateProductPrice(newPrice) {
        await this.fill(this.form.price, newPrice);
        await this.click(this.page.locator('button:has-text("Update Product")'));
        await this.waitForLoadingToFinish();
    }

    async searchProduct(name) {
        const searchBar = this.page.locator('input[placeholder*="Search"]');
        if (await this.isVisible(searchBar)) {
            await this.fill(searchBar, name);
        }
    }
}
