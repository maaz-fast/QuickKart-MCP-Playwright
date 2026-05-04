import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminDashboardPage } from '../../Pages/AdminPanel/AdminDashboardPage';
import { AdminNotificationsPage } from '../../Pages/AdminPanel/AdminNotificationsPage';
import { AdminProfilePage } from '../../Pages/AdminPanel/AdminProfilePage';

// We are testing the Admin Panel's "core" features: stats, navigation, and settings
test.describe('Admin Dashboard & Navigation Tests', () => {
    let loginPage;
    let dashboardPage;

    // Before we can test anything in the Admin panel, we must log in as an administrator
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new AdminDashboardPage(page);

        // We head to the login page and enter the admin credentials
        await loginPage.goto();
        await loginPage.login('maaz+admin@gmail.com', '123456');
        
        // We double-check that the URL actually takes us to the admin dashboard
        await expect(page).toHaveURL(/.*admin\/dashboard/);
    });

    // Test 1: Checking if the "Pulse" of the shop (Revenue, Orders, etc.) is visible
    test('Dashboard should display key statistics', async ({ page }) => {
        // We grab all the stat values from the dashboard cards
        const stats = await dashboardPage.getStats();
        
        // We check if the revenue card has a dollar sign (meaning it's formatted right)
        expect(stats.revenue).toContain('$');
        // We ensure Orders, Products, and Users are all non-negative numbers
        expect(parseInt(stats.orders)).toBeGreaterThanOrEqual(0);
        expect(parseInt(stats.products)).toBeGreaterThanOrEqual(0);
        expect(parseInt(stats.users)).toBeGreaterThanOrEqual(0);
    });

    // Test 2: Making sure the Sidebar menu correctly routes us to every admin page
    test('Should navigate between admin modules', async ({ page }) => {
        // These are the sections we want to visit one by one
        const modules = ['products', 'categories', 'orders', 'users', 'support', 'activityLogs'];
        
        for (const module of modules) {
            // We tell the sidebar to click the module link
            await dashboardPage.navigateTo(module);
            // We verify the browser URL changed to the correct module path
            await expect(page).toHaveURL(new RegExp(`.*admin/${module === 'activityLogs' ? 'activity-logs' : module}`));
            // We navigate back to the dashboard to reset for the next loop iteration
            await dashboardPage.sidebar.dashboard.click();
        }
    });

    // Test 3: Checking if the global notifications system is working
    test('Should verify Notifications screen', async ({ page }) => {
        const notificationsPage = new AdminNotificationsPage(page);
        
        // We click the notification bell icon in the top header
        await dashboardPage.header.notificationsBtn.click();
        
        // Once the dropdown opens, we click the "View All" link
        await dashboardPage.header.viewAllNotifications.waitFor({ state: 'visible' });
        await dashboardPage.header.viewAllNotifications.click();
        
        // We expect to land on the main /notifications page
        await expect(page).toHaveURL(/.*notifications/);
        // We confirm the page title "Notifications" is visible to the user
        await expect(notificationsPage.heading).toBeVisible();
    });

    // Test 4: Verifying the Admin's own profile and its security rules
    test('Should verify Admin Profile settings', async ({ page }) => {
        const profilePage = new AdminProfilePage(page);
        // We click the profile icon in the header to enter settings
        await dashboardPage.header.profileBtn.click();
        await expect(page).toHaveURL(/.*profile/);
        
        // Important: We check that the Email is read-only (disabled) so it can't be changed by accident
        const isReadOnly = await profilePage.isEmailReadOnly();
        expect(isReadOnly).toBe(true);
        
        // We ensure the Name field isn't blank and shows the admin's name
        const name = await profilePage.nameInput.inputValue();
        expect(name.length).toBeGreaterThan(0);
    });

    // Test 5: Verifying profile picture upload
    test('Should upload Admin Profile picture', async ({ page }) => {
        const profilePage = new AdminProfilePage(page);
        const path = require('path');
        
        await dashboardPage.header.profileBtn.click();
        await expect(page).toHaveURL(/.*profile/);
        
        const filePath = path.resolve('Resources/Admin_Avatar.png');
        await profilePage.uploadProfilePicture(filePath);
        
        // Verify toast message
        await expect(page.locator('text=/Profile image updated!/i')).toBeVisible();
        console.log('[TEST PASSED] Admin profile picture uploaded successfully');
    });
});
