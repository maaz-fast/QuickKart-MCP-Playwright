import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { AdminProductsPage } from '../../Pages/AdminPanel/AdminProductsPage';

// This suite tests the "Life Cycle" of a product: Creation, Search, Editing, and Deletion
test.describe('Admin Product Management @admin', () => {
    let productsPage;

    // We use the storageState from playwright.config.js for instant login
    test.beforeEach(async ({ page }, testInfo) => {
        productsPage = new AdminProductsPage(page);
        await productsPage.skipOnRetry(testInfo);
        await productsPage.goto();
        await productsPage.cleanupPageState();
    });

    // Test 1: Creating a brand new product from scratch
    test('Should create a new product successfully', async ({ page }) => {
        // ... (data setup) ...
        const productData = {
            name: 'Pro Gaming Mouse ' + Date.now(),
            description: 'Ultra high precision gaming mouse with RGB.',
            price: '85.99',
            stock: '50',
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf'
        };

        const initialCount = await productsPage.getProductCount();
        await productsPage.addNewProduct(productData);
        await productsPage.fillProductForm(productData);
            
        // Verify creation by checking if the count increased or the product appears in the list
        await productsPage.goto();
        const finalCount = await productsPage.getProductCount();
        expect(finalCount).toBe(initialCount + 1);
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
            
            // We expect to be back on the products list
            await productsPage.goto();
            await productsPage.waitForLoadingToFinish();
            
            // Finally, we verify that the price in the table actually shows the new value
            const updatedPrice = await productsPage.tableRows.first().locator('[data-testid="product-price"]').innerText();
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
            
            // We verify that the number of products in the table has decreased by 1
            await productsPage.waitForLoadingToFinish();
            const finalCount = await productsPage.getProductCount();
            expect(finalCount).toBeLessThan(initialCount);
        }
    });
});
