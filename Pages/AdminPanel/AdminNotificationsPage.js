export class AdminNotificationsPage {
    constructor(page) {
        this.page = page;
        this.heading = page.locator('h1:has-text("Notifications")');
        this.notificationItems = page.locator('.notification-item'); // Assuming a class based on usual patterns
        this.unreadDots = page.locator('.blue-dot');
    }

    async goto() {
        await this.page.goto('https://quickkart-shop-nine.vercel.app/notifications');
    }

    async getNotificationCount() {
        return await this.notificationItems.count();
    }

    async getUnreadCount() {
        return await this.unreadDots.count();
    }
}
