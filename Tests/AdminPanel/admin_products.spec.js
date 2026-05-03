import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminProductsPage } from '../../Pages/AdminPanel/AdminProductsPage';

// This suite tests the "Life Cycle" of a product: Creation, Search, Editing, and Deletion
test.describe('Admin Product Management', () => {
    let loginPage;
    let productsPage;

    // We start every test by logging in as the Admin and heading to the /admin/products page
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new AdminProductsPage(page);

        await loginPage.goto();
        await loginPage.login('maaz+admin@gmail.com', '123456');
        await productsPage.goto();
    });

    // Test 1: Creating a brand new product from scratch
    test('Should create a new product successfully', async ({ page }) => {
        // This is the information for our new test product
        const productData = {
            name: 'Pro Gaming Mouse ' + Date.now(), // We add a timestamp to keep the name unique
            description: 'Ultra high precision gaming mouse with RGB.',
            price: '85.99',
            stock: '50',
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf'
        };

        // We click the "Add Product" button and fill out the entire form
        await productsPage.addNewProduct(productData);
        
        // We expect the app to redirect us back to the main list and show a success message
        await expect(page).toHaveURL(/.*admin\/products/);
        await expect(page.locator('text=Product created successfully')).toBeVisible();
    });

    // Test 2: Making sure we can find our products using the search bar
    test('Should search for a product', async ({ page }) => {
        // We type "Mouse" into the search box
        await productsPage.searchProduct('Mouse');
        // We check if the table actually filtered down to show at least one matching item
        const count = await productsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    // Test 3: Updating an existing product (changing its price)
    test('Should edit a product successfully', async ({ page }) => {
        // First, we check if there are any products available to edit
        const rowCount = await productsPage.getProductCount();
        if (rowCount > 0) {
            const newPrice = '175.50';
            
            // We click "Edit" on the very first product in the list
            await productsPage.clickEditProduct(0);
            // We verify the browser navigated to the Edit URL
            await expect(page).toHaveURL(/.*\/edit\/.*/);
            
            // We change the price and click the "Update" button
            await productsPage.updateProductPrice(newPrice);
            
            // We expect to be back on the products list with a success notification
            await expect(page).toHaveURL(/.*\/admin\/products/);
            await expect(page.locator('text=Product updated successfully')).toBeVisible();
            
            // Finally, we verify that the price in the table actually shows the new value
            const updatedPrice = await productsPage.tableRows.first().locator('td').nth(3).innerText();
            expect(updatedPrice).toContain(newPrice);
        }
    });

    // Test 4: Removing a product from the shop
    test('Should delete a product', async ({ page }) => {
        const initialCount = await productsPage.getProductCount();
        if (initialCount > 0) {
            // We set up a "listener" to automatically click 'OK' on the browser's delete confirmation popup
            page.on('dialog', dialog => dialog.accept());
            
            // We click the Delete button on the first product
            await productsPage.deleteProduct(0);
            // We confirm the deletion was successful
            await expect(page.locator('text=Product deleted successfully')).toBeVisible();
            
            // We verify that the number of products in the table has decreased by 1
            const finalCount = await productsPage.getProductCount();
            expect(finalCount).toBeLessThan(initialCount);
        }
    });
});
