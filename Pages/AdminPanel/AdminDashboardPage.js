// AdminDashboardPage - This is the central hub for the administrator area
export class AdminDashboardPage {
    constructor(page) {
        this.page = page;
        
        // --- Sidebar Navigation ---
        // We scope these to the 'aside' tag to ensure we don't click header links by mistake
        this.sidebar = {
            dashboard: page.locator('aside a:has-text("Dashboard")'),
            products: page.locator('aside a:has-text("Products")'),
            categories: page.locator('aside a:has-text("Categories")'),
            orders: page.locator('aside a:has-text("Orders")'),
            users: page.locator('aside a:has-text("Users")'),
            support: page.locator('aside a:has-text("Support")'),
            logs: page.locator('aside a:has-text("Activity Logs")')
        };

        // --- Top Header Actions ---
        this.header = {
            notificationsBtn: page.locator('button[data-testid="notification-icon"]'),
            viewAllNotifications: page.locator('a:has-text("View All Notifications")'),
            profileBtn: page.locator('header a[href="/profile"]')
        };

        // --- Statistics Cards ---
        // These cards show the live "health" of the shop
        this.stats = {
            revenue: page.locator('div:has-text("Total Revenue") + div p'),
            orders: page.locator('div:has-text("Total Orders") + div p'),
            products: page.locator('div:has-text("Total Products") + div p'),
            users: page.locator('div:has-text("Total Users") + div p')
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
            console.error(`Module ${module} not found in sidebar!`);
        }
    }
}
