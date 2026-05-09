import BasePage from '../BasePage.js';
import locators from '../../Locators/locators.js';

export class AdminOrdersPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = locators.admin.ordersPage;
        this.tableRows = page.locator(this.locators.row);
        this.filterDropdown = page.locator(this.locators.filterDropdown);
    }

    async goto() {
        await this.page.goto('/admin/orders');
        await this.waitForLoadingToFinish();
    }

    async updateOrderStatus(orderId, newStatus) {
        // Find row by order ID
        const row = this.tableRows.filter({ hasText: orderId });
        const statusBtn = row.locator(this.locators.statusUpdateBtn);
        
        // Ensure element is in view and click
        await statusBtn.scrollIntoViewIfNeeded();
        await this.click(statusBtn, { force: true }); 
        
        // Select new status from the options container
        const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(`^${newStatus}$`) });
        await this.click(option.first(), { force: true });
        await this.waitForLoadingToFinish();
    }

    async filterByStatus(status) {
        // Click custom header filter
        await this.click(this.filterDropdown, { force: true });
        // Select status from the options container
        const option = this.page.locator('.custom-select-options .custom-select-option').filter({ hasText: new RegExp(`^${status}$`) });
        await this.click(option.first(), { force: true });
        await this.waitForLoadingToFinish();
    }
}
