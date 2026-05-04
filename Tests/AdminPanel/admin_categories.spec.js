import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminCategoriesPage } from '../../Pages/AdminPanel/AdminCategoriesPage';

test.describe('Admin Categories Management', () => {
    let loginPage;
    let categoriesPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        categoriesPage = new AdminCategoriesPage(page);

        await loginPage.goto();
        await loginPage.login('maaz+admin@gmail.com', '123456');
        await categoriesPage.goto();
    });

    test('Should add and delete a category', async ({ page }) => {
        const categoryName = `New Cat ${Date.now()}`;
        
        // Add Category
        await categoriesPage.addCategory(categoryName);
        
        // Verify in list
        const categoryList = page.locator('tbody tr');
        await expect(categoryList).toContainText(categoryName);
        
        // Delete Category
        await categoriesPage.deleteCategory(categoryName);
        
        // Verify removed
        await expect(page.locator(`text=${categoryName}`)).not.toBeVisible();
    });
});
