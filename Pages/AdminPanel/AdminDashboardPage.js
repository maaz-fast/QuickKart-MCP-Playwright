import BasePage from '../BasePage.js';

// AdminDashboardPage - This is the central hub for the administrator area
export class AdminDashboardPage extends BasePage {
    constructor(page) {
        super(page);
        
        // --- Sidebar Navigation ---
        // We scope these to the 'aside' tag to ensure we don't click header links by mistake
        this.sidebar = {
            dashboard: page.locator('aside a:has-text("Dashboard")'),
            products: page.locator('aside a:has-text("Products")'),
            categories: page.locator('aside a:has-text("Categories")'),
            orders: page.locator('aside a:has-text("Orders")'),
            users: page.locator('aside a:has-text("Users")'),
            support: page.locator('aside a:has-text("Support")'),
            activityLogs: page.locator('aside a:has-text("Activity Logs")')
        };

        // --- Top Header Actions ---
        this.header = {
            notificationsBtn: page.locator('button[data-testid="notification-icon"]'),
            viewAllNotifications: page.locator('a:has-text("View All Notifications")'),
            profileBtn: page.locator('nav a[href="/profile"]')
        };

        // --- Statistics Cards ---
        // These cards show the live "health" of the shop
        // Target H2 tags which contain the actual values
        this.stats = {
            revenue: page.locator('div:has-text("Total Revenue") ~ h2'),
            orders: page.locator('div:has-text("Total Orders") ~ h2'),
            products: page.locator('div:has-text("Total Products") ~ h2'),
            users: page.locator('div:has-text("Total Users") ~ h2')
        };
    }

    // This method collects all the numbers from the dashboard cards in one go
    async getStats() {
        return {
            revenue: await this.stats.revenue.innerText(),
            orders: await this.stats.orders.innerText(),
            products: await this.stats.products.innerText(),
            users: await this.stats.users.innerText()
        };
    }

    // A simple helper to click a sidebar link based on the module name you provide
    async navigateTo(module) {
        if (this.sidebar[module]) {
            await this.sidebar[module].click();
        } else {
            const errorMsg = `Module ${module} not found in sidebar! Available: ${Object.keys(this.sidebar).join(', ')}`;
            console.error(errorMsg);
            throw new Error(errorMsg);
        }
    }
}
