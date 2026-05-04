import BasePage from '../BasePage.js';

export class AdminNotificationsPage extends BasePage {
    constructor(page) {
        super(page);
        this.heading = page.locator('h1:has-text("Notifications")');
        this.notificationItems = page.locator('.notification-item');
        this.unreadDots = page.locator('.blue-dot');
    }

    async goto() {
        await this.page.goto('/notifications');
        await this.waitForLoadingToFinish();
    }

    async getNotificationCount() {
        return await this.notificationItems.count();
    }

    async getUnreadCount() {
        return await this.unreadDots.count();
    }
}
