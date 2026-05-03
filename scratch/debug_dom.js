import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to signup...');
  await page.goto('https://quickkart-shop-nine.vercel.app/signup');
  
  const email = `debug${Date.now()}@test.com`;
  await page.fill('input[data-testid="name-input"]', 'Debug User');
  await page.fill('input[data-testid="email-input"]', email);
  await page.fill('input[data-testid="password-input"]', 'TestPass123!');
  await page.fill('input[data-testid="confirm-password-input"]', 'TestPass123!');
  await page.click('button[data-testid="signup-button"]');
  
  console.log('Adding product to cart...');
  await page.click('div:has(h3) img >> nth=0');
  await page.waitForSelector('text=Add to Cart');
  await page.click('button:has-text("Add to Cart")');
  await page.waitForTimeout(2000);
  
  console.log('Going to cart...');
  await page.goto('https://quickkart-shop-nine.vercel.app/cart');
  await page.waitForTimeout(3000);
  
  console.log('Taking screenshot of cart...');
  await page.screenshot({ path: 'scratch/debug_cart.png' });
  
  console.log('Clicking checkout...');
  // ... rest of script
  await page.click('button:has-text("Proceed to Checkout")');
  await page.waitForTimeout(5000);
  
  console.log('Taking screenshot of checkout...');
  await page.screenshot({ path: 'scratch/debug_checkout.png' });
  
  const url = await page.url();
  console.log(`Current URL: ${url}`);
  const title = await page.textContent('h1');
  console.log(`Heading: ${title}`);
  const bodyText = await page.textContent('body');
  const mainHtml = await page.innerHTML('main');
  console.log('--- BODY TEXT START ---');
  console.log(bodyText.substring(0, 2000)); 
  console.log('--- BODY TEXT END ---');
  console.log('--- MAIN HTML START ---');
  console.log(mainHtml); 
  console.log('--- MAIN HTML END ---');
  
  await browser.close();
})();
