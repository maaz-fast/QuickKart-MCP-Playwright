export class AdminProductsPage {
    constructor(page) {
        this.page = page;
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
    }

    async clickAddProduct() {
        await this.addProductBtn.click();
    }

    async fillProductForm(details) {
        await this.form.name.fill(details.name);
        await this.form.description.fill(details.description);
        await this.form.price.fill(details.price);
        await this.form.stock.fill(details.stock);
        await this.form.image.fill(details.image);
        
        // Handle custom dropdown
        await this.form.categoryDropdown.click();
        await this.page.locator(`div:has-text("${details.category}")`).last().click();
        
        await this.form.submitBtn.click();
    }

    async getProductCount() {
        return await this.tableRows.count();
    }

    async deleteProduct(index = 0) {
        const deleteBtn = this.tableRows.nth(index).locator('button:has-text("Delete")');
        await deleteBtn.click();
    }

    async clickEditProduct(index = 0) {
        const editBtn = this.tableRows.nth(index).locator('button:has-text("Edit")');
        await editBtn.click();
    }

    async updateProductPrice(newPrice) {
        await this.form.price.fill(newPrice);
        await this.page.locator('button:has-text("Update Product")').click();
    }

    async searchProduct(name) {
        // If there's a search bar, use it. Based on snapshot, we'll verify first.
        const searchBar = this.page.locator('input[placeholder*="Search"]');
        if (await searchBar.isVisible()) {
            await searchBar.fill(name);
        }
    }
}
