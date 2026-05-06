import BasePage from '../BasePage.js';
import locators from '../../Locators/locators.js';

// AdminDashboardPage - This is the central hub for the administrator area
export class AdminDashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = locators.admin;
        
        // --- Sidebar Navigation ---
        this.sidebar = {
            dashboard: this.locators.sidebar.dashboard,
            products: this.locators.sidebar.products,
            categories: this.locators.sidebar.categories,
            orders: this.locators.sidebar.orders,
            users: this.locators.sidebar.users,
            support: this.locators.sidebar.support,
            activityLogs: this.locators.sidebar.activityLogs
        };

        // --- Top Header Actions ---
        this.header = {
            notificationsBtn: locators.navigation.notificationButton,
            viewAllNotifications: this.locators.notifications.viewAllLink,
            profileBtn: locators.navigation.userProfileLink
        };

        // --- Statistics Cards ---
        this.stats = this.locators.dashboard.stats;
    }

    // This method collects all the numbers from the dashboard cards in one go
    async getStats() {
        return {
            revenue: await this.getText(this.stats.revenue),
            orders: await this.getText(this.stats.orders),
            products: await this.getText(this.stats.products),
            users: await this.getText(this.stats.users)
        };
    }

    // A simple helper to click a sidebar link based on the module name you provide
    async navigateTo(module) {
        if (this.sidebar[module]) {
            console.log(`[ADMIN] Navigating to module: ${module}`);
            await this.click(this.sidebar[module]);
            await this.waitForLoadingToFinish();
        } else {
            const errorMsg = `Module ${module} not found in sidebar! Available: ${Object.keys(this.sidebar).join(', ')}`;
            console.error(errorMsg);
            throw new Error(errorMsg);
        }
    }
}
