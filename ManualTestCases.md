# QuickKart — Manual Test Cases

**Project:** QuickKart E-Commerce Platform  
**Version:** 1.0  
**Prepared By:** Maaz Imtiaz (SQA Engineer)  
**Date:** May 2026  
**Base URL:** https://quickkart-shop-nine.vercel.app

---

## Table of Contents

1. [Authentication Tests — Signup](#1-signup-tests)
2. [Authentication Tests — Login](#2-login-tests)
3. [Authentication Tests — Logout](#3-logout-tests)
4. [Authentication Tests — Forgot Password](#4-forgot-password-tests)
5. [Authentication Tests — Navigation](#5-navigation-tests-auth)
6. [Cart Tests](#6-cart-tests)
7. [Checkout Tests](#7-checkout-tests)
8. [Product Tests](#8-product-tests)
9. [Profile and Account Tests](#9-profile--account-tests)
10. [Orders Page Tests](#10-orders-page-tests)
11. [Wishlist Tests](#11-wishlist-tests)
12. [Navigation Tests](#12-navigation-tests-account-level)
13. [Admin Panel Tests](#13-admin-panel-tests)
14. [Contact Page Tests](#14-contact-page-tests)

---

## 1. Signup Tests

| TC ID | Test Case Title | Description | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|---|
| TC-AUTH-001 | User can create account with valid data | Verifies that a new user can successfully register with valid details. | App accessible, no active session | 1. Go to /signup 2. Fill Full Name 3. Fill Email 4. Fill Password 5. Fill Confirm Password 6. Click Create Account | Name: Test User, Email: test123@test.com, Password: TestPass123! | Redirected to Home Page. Products grid visible. Logout button visible. | Positive |
| TC-AUTH-002 | Signup page displays all form fields | Ensures all required UI elements are present on the signup screen. | App accessible | 1. Go to /signup | — | Heading: Create account. Fields: Full Name, Email, Password, Confirm Password. Button: Create Account. Link: Sign in. | Positive |
| TC-AUTH-003 | Sign in link navigates to login page | Checks the navigation link from the signup page back to login. | User on Signup page | 1. Go to /signup 2. Click Sign in link | — | Navigates to /login. Welcome back heading visible. | Positive |
| TC-AUTH-004 | Signup button is enabled on page load | Confirms that the signup button is interactive immediately. | User on Signup page | 1. Go to /signup | — | Create Account button is enabled (not greyed out). | Positive |
| TC-AUTH-005 | User cannot signup with empty full name | Validates mandatory field enforcement for the full name. | User on Signup page | 1. Go to /signup 2. Fill Email 3. Fill Password 4. Fill Confirm Password 5. Leave Full Name blank 6. Click Create Account | Email: test@test.com, Password: TestPass123! | Native HTML validation error on Full Name field. User stays on /signup. | Negative |
| TC-AUTH-006 | Cannot create account with registered email | Ensures that duplicate email registration is prevented. | Account with duplicate@test.com already exists | 1. Go to /signup 2. Fill Name 3. Enter registered email 4. Fill Password 5. Fill Confirm Password 6. Click Create Account | Name: Test User, Email: duplicate@test.com, Password: TestPass123! | Error: User already exists. User stays on /signup. | Negative |
| TC-AUTH-007 | Password visibility toggle works on signup | Tests the show/hide functionality of the password field. | User on Signup page | 1. Go to /signup 2. Enter password 3. Verify field is hidden 4. Click eye icon 5. Verify field is visible | Password: TestPass123! | Step 3: Field type is password (dots). Step 5: Field type is text (visible). | Positive |

---

## 2. Login Tests

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-AUTH-008 | User can login with valid credentials | Verifies standard login functionality with a correct email and password. | Account exists with test credentials | 1. Go to /login 2. Enter Email 3. Enter Password 4. Click Sign In | Email: validuser@test.com, Password: TestPass123! | Redirected to Home Page (/). Products displayed. Logout button visible. | Positive |
| TC-AUTH-009 | Login page displays heading and form fields | Ensures the login UI is complete and correctly rendered. | No active session | 1. Go to /login | — | Heading: Welcome back. Email input, Password input, Sign In button, Forgot password? link, Create one link. | Positive |
| TC-AUTH-010 | Email and password inputs accept text | Checks that the login form inputs are functional and accept user typing. | User on Login page | 1. Go to /login 2. Click Email field and type 3. Click Password field and type | Email: test@example.com, Password: password123 | Email field shows test@example.com. Password field accepts input. | Positive |
| TC-AUTH-011 | Create account link navigates to signup | Validates navigation from the login page to the registration screen. | User on Login page | 1. Go to /login 2. Click Create one link | — | Navigates to /signup. Create account heading visible. | Positive |
| TC-AUTH-012 | Password visibility toggle works on login | Tests the mask/unmask feature on the login screen password field. | User on Login page | 1. Go to /login 2. Enter password 3. Click eye icon | Password: TestPass123! | Password becomes visible as plain text. | Positive |
| TC-AUTH-013 | Cannot login with wrong password | Ensures that incorrect passwords correctly trigger an authentication failure. | Account exists | 1. Go to /login 2. Enter correct email 3. Enter wrong password 4. Click Sign In | Email: validuser@test.com, Password: WrongPass999 | Error message displayed. User stays on /login. | Negative |
| TC-AUTH-014 | Cannot login with unregistered email | Validates that non-existent users cannot bypass authentication. | No account with given email | 1. Go to /login 2. Enter non-existent email 3. Enter any password 4. Click Sign In | Email: notexist@nowhere.com, Password: TestPass123! | Error message displayed. User stays on /login. | Negative |

---

## 3. Logout Tests

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-AUTH-015 | User can logout from home page | Verifies that the logout process correctly terminates the user session and redirects to login. | User logged in on Home Page | 1. Verify Home Page is displayed 2. Click Logout button in navbar | — | Redirected to /login. Session cleared. Logout button no longer visible. | Positive |

---

## 4. Forgot Password Tests

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-AUTH-016 | Forgot password page loads with form | Ensures the password recovery initiation screen is accessible and correct. | No active session | 1. Go to /forgot-password | — | Heading: Forgot password? Email input visible. Verify Email button visible. | Positive |
| TC-AUTH-017 | Back to login link works | Validates the navigation link from the forgot password page back to login. | User on Forgot Password page | 1. Go to /forgot-password 2. Click Back to Login link | — | Navigates to /login. Welcome back heading visible. | Positive |
| TC-AUTH-018 | Email input accepts text | Checks that the password recovery form inputs are functional. | User on Forgot Password page | 1. Go to /forgot-password 2. Click Email field 3. Type email | Email: test@example.com | Email field displays typed value test@example.com. | Positive |
| TC-AUTH-019 | Full password reset flow works end-to-end | Validates the complete multi-step password reset process from email verification to new login. | Registered user account exists | 1. Go to /forgot-password 2. Enter registered email 3. Click Verify Email 4. On Reset page, enter new password 5. Confirm new password 6. Click Reset Password | Email: validuser@test.com, New Password: NewSecurePass123! | Step 3: Redirected to /reset-password. Step 6: Redirected to /login. User can login with new password. | Positive |

---

## 5. Navigation Tests (Auth)

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-AUTH-020 | QuickKart logo navigates to home | Validates that the brand logo acts as a global home navigation link. | User on any page | 1. Go to /login 2. Click QuickKart logo in navbar | — | Navigates to home page (base URL or /). | Positive |
| TC-AUTH-021 | Contact link accessible from login page | Ensures that guest users can access the support contact page. | User on Login page | 1. Go to /login 2. Click Contact link in navbar | — | Navigates to /contact. Contact Us page displayed. | Positive |

---

## 6. Cart Tests

**Prerequisites:** User is logged in. At least one product has been added to the cart.

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-CART-001 | Cart page displays added product | Verifies that items added to the cart are correctly listed on the cart page. | User logged in, 1 product in cart | 1. Go to /cart | — | Cart page visible. At least 1 item shown. Empty cart message NOT shown. | Positive |
| TC-CART-002 | Cart displays order summary | Ensures that price breakdowns and totals are present for the current cart. | User logged in, 1 product in cart | 1. Go to /cart | — | Order summary visible. Subtotal > 0. Total > 0. Subtotal, Shipping, Tax, Total values all shown. | Positive |
| TC-CART-003 | Cart order summary calculations are correct | Validates the mathematical accuracy of subtotal, tax, and shipping summations. | User logged in, 1 product in cart | 1. Go to /cart 2. Note Subtotal, Shipping, Tax values 3. Calculate expected Total | — | Total = Subtotal + Shipping + Tax (within .01 rounding). | Positive |
| TC-CART-004 | Proceed to checkout button is visible | Confirms the presence of the primary checkout call-to-action. | User logged in, 1 product in cart | 1. Go to /cart | — | Proceed to Checkout button is visible in the order summary panel. | Positive |
| TC-CART-005 | Proceed to checkout navigates to checkout | Tests the transition from the cart review screen to the payment/shipping flow. | User logged in, 1 product in cart | 1. Go to /cart 2. Click Proceed to Checkout | — | Navigates to /checkout. Shipping, Payment, Order Summary sections visible. | Positive |
| TC-CART-006 | Continue shopping navigates to home | Checks the navigation link to return to product browsing from the cart. | User logged in, 1 product in cart | 1. Go to /cart 2. Click Continue Shopping | — | Navigates to Home Page (/). Products grid visible. | Positive |
| TC-CART-007 | Remove item empties the cart | Tests the functionality to delete items from the cart and the resulting empty state. | User logged in, exactly 1 item in cart | 1. Go to /cart 2. Click Remove (trash icon) on cart item | — | Item removed. Your cart is empty message displayed. | Positive |
| TC-CART-008 | Empty cart shows appropriate message | Ensures a user-friendly empty state is displayed when no items are present. | User logged in, cart is empty | 1. Go to /cart | — | Empty state with Your cart is empty message displayed. | Positive |
| TC-CART-009 | Adding multiple quantities updates cart | Validates that the cart correctly aggregates multiple units of the same product. | User logged in | 1. Go to product page 2. Set quantity to 2 3. Click Add to Cart 4. Go to /cart | Quantity: 2 | Cart shows product. Total reflects quantity x price. | Positive |
| TC-CART-010 | Cart navigation to home works | Tests the global home link from within the cart page. | User logged in, on Cart page | 1. Go to /cart 2. Click Home in navbar | — | Navigates to Home Page. Products visible. | Positive |
| TC-CART-011 | Cart icon displays in navigation | Ensures the cart access point is present in the global navigation bar. | User logged in, on Home Page | 1. Go to / | — | Cart icon or link visible in navbar containing Cart text. | Positive |
| TC-CART-012 | Cart persists after page refresh | Checks that cart data is stored locally and survives browser reloads. | User logged in, 1 product in cart | 1. Go to /cart 2. Note cart item count 3. Press F5 to refresh 4. Wait for page reload | — | Same number of items displayed after refresh. Cart data not lost. | Positive |
| TC-CART-013 | Cart accessible from product detail page | Validates navigation to the cart from deep product pages. | User logged in, on product detail page | 1. Go to any product detail page 2. Click Cart icon in navbar | — | Navigates to /cart. | Positive |

---

## 7. Checkout Tests

**Prerequisites:** User logged in, product in cart, navigated to /checkout.

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-CHK-001 | Checkout page displays all required sections | Verifies the structural completeness of the checkout page. | User on /checkout | 1. Observe page layout | — | Three sections visible: Shipping Information, Payment Details, Order Summary. Place Order button visible. | Positive |
| TC-CHK-002 | User can fill in shipping information | Checks that all shipping data inputs are functional and accept user data. | User on /checkout | 1. Fill all shipping fields 2. Verify values entered | First Name: Test, Last Name: User, Email: test@example.com, Phone: 1234567890, Address: 123 Test Lane, City: Test City, ZIP: 12345 | All fields accept input. First Name shows Test. No validation errors shown. | Positive |
| TC-CHK-003 | Full checkout flow completes successfully | Validates the entire purchase flow from shipping/payment entry to order success. | User on /checkout | 1. Fill all shipping fields 2. Fill all payment fields 3. Click Place Order 4. Verify Success Screen appears 5. Click "View My Orders" | Shipping: John Doe, john@example.com, 1234567890, 123 Street, Karachi, 54000. Card: 4111111111111111, Expiry: 12/30, CVV: 123 | Step 4: Success message "Order Placed Successfully!" visible. Step 5: Redirected to /orders. New order appears in list. | Positive |
| TC-CHK-004 | Validation prevents placing order with empty fields | Ensures that the system enforces mandatory field completion before order placement. | User on /checkout | 1. Leave all fields empty 2. Click Place Order | — | Stays on /checkout. Validation errors shown on required fields. No order placed. | Negative |

---

## 8. Product Tests

**Prerequisites:** User is logged in.

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-PROD-001 | Home page displays product grid | Ensures that the main product listing is rendered correctly upon login. | User logged in, on Home Page | 1. Go to / 2. Wait for products to load | — | Products grid visible. At least 1 product card displayed. Each card has image, name, and price. | Positive |
| TC-PROD-002 | Search for a product returns correct results | Validates the keyword search functionality and results filtering. | User logged in, on Home Page | 1. Click search input 2. Type search term 3. Press Enter or wait | Search: iPhone | Grid updates to show only matching products. At least 1 result. | Positive |
| TC-PROD-003 | Filter by category shows relevant products | Tests the category-based filtering logic on the home page. | User logged in, on Home Page | 1. Click Electronics category button | Category: Electronics | Grid shows only Electronics products. Count > 0. | Positive |
| TC-PROD-004 | Clicking a product opens product details | Checks the link from the product grid to the individual product detail page. | User logged in, on Home Page | 1. Note name of first product card 2. Click first product card | — | Navigates to /products/:id. Product name matches card. Price displayed (e.g. .00). Description visible. | Positive |
| TC-PROD-005 | Quantity increment and decrement work | Tests the interactive quantity selector on the product details screen. | User logged in, on product detail page | 1. Go to any product detail page 2. Note initial quantity (1) 3. Click + button 4. Note quantity 5. Click - button 6. Note quantity | — | Initial: 1. After increment: 2. After decrement: 1. | Positive |
| TC-PROD-006 | Pagination navigates to next page | Validates the ability to browse through multiple pages of products. | User logged in, multiple product pages exist | 1. Scroll to bottom of products 2. Click Next pagination button | — | Grid loads next page of products. Previous button becomes enabled. | Positive |

---

## 9. Profile and Account Tests

**Prerequisites:** User is logged in.

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-PROF-001 | Profile page loads when accessed | Verifies the accessibility and basic loading of the user profile section. | User logged in | 1. Go to /profile 2. Wait for page to load | — | Profile page visible. User name and email information displayed. | Positive |
| TC-PROF-002 | Profile page displays user information | Checks that the profile page correctly pulls and displays account details. | User logged in | 1. Go to /profile | — | User full name and email address displayed on page. | Positive |
| TC-PROF-003 | Profile navigation to Home works | Tests the return path from the profile page to the main shop. | User logged in, on Profile page | 1. Go to /profile 2. Click Home in navbar | — | Navigates to /. Products grid visible. | Positive |
| TC-PROF-004 | Profile navigation to Orders works | Validates the cross-navigation between account management pages. | User logged in, on Profile page | 1. Go to /profile 2. Click Orders in navbar | — | Navigates to /orders. Orders page heading or empty state visible. | Positive |
| TC-PROF-005 | Logout from profile page works | Ensures the logout trigger is functional from the profile view. | User logged in, on Profile page | 1. Go to /profile 2. Click Logout button | — | Navigates to /login. Session cleared. | Positive |
| TC-PROF-006 | Profile page handles loading state | Checks the UX during profile data retrieval. | User logged in | 1. Go to /profile 2. Observe page behavior during load | — | Loading indicator briefly shown then disappears when profile data loads. | Positive |

---

## 10. Orders Page Tests

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-ORD-001 | Orders page loads when accessed | Verifies that the purchase history page is accessible for logged-in users. | User logged in | 1. Go to /orders 2. Wait for page to load | — | Orders page heading visible (My Orders). Either orders list or no orders empty state shown. | Positive |
| TC-ORD-002 | New user sees no orders message | Ensures the empty state is correctly handled for accounts with no purchase history. | Newly registered user, no orders placed | 1. Register new account 2. Go to /orders | — | Empty state shown: No orders yet. Start Shopping button displayed. | Positive |
| TC-ORD-003 | Orders page navigation to Home works | Validates the home link from the orders management view. | User logged in, on Orders page | 1. Go to /orders 2. Click Home in navbar | — | Navigates to /. Products visible. | Positive |
| TC-ORD-004 | Orders page navigation to Cart works | Checks accessibility of the cart from the orders page. | User logged in, on Orders page | 1. Go to /orders 2. Click Cart icon in navbar | — | Navigates to /cart. | Positive |
| TC-ORD-005 | Orders page handles loading states | Verifies the UX during order history data fetching. | User logged in | 1. Go to /orders 2. Observe during API load | — | Loading message (Retrieving Purchase History...) briefly shown then disappears. | Positive |

---

## 11. Wishlist Tests

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-WISH-001 | Wishlist page loads when accessed | Ensures the user's saved items page is rendered correctly. | User logged in | 1. Go to /wishlist | — | Wishlist page heading Your Wishlist visible. | Positive |
| TC-WISH-002 | New user sees empty wishlist message | Validates the empty state UI for accounts with no saved products. | Newly registered user, no wishlist items | 1. Register new account 2. Go to /wishlist | — | Empty state: Your wishlist is empty. Explore Products button visible. | Positive |
| TC-WISH-003 | Explore products button navigates to Home | Tests the call-to-action link to return to shopping from an empty wishlist. | User logged in, wishlist empty | 1. Go to /wishlist 2. Click Explore Products button | — | Navigates to Home Page (/). Products grid visible. | Positive |
| TC-WISH-004 | Wishlist navigation to Home works | Checks the global navigation link from the wishlist view. | User logged in, on Wishlist page | 1. Go to /wishlist 2. Click Home in navbar | — | Navigates to Home Page. | Positive |
| TC-WISH-005 | Wishlist navigation to Cart works | Validates cart accessibility from the wishlist section. | User logged in, on Wishlist page | 1. Go to /wishlist 2. Click Cart icon in navbar | — | Navigates to /cart. | Positive |
| TC-WISH-006 | Wishlist page handles loading state | Checks the UX during wishlist data retrieval. | User logged in | 1. Go to /wishlist 2. Observe during load | — | Loading message Loading your wishlist... briefly shown then disappears. | Positive |

---

## 12. Navigation Tests (Account-Level)

| TC ID | Test Case Title | Preconditions | Test Steps | Test Data | Expected Result | Type |
|---|---|---|---|---|---|---|
| TC-NAV-001 | Profile link accessible from Home | Verifies that the user can navigate to profile settings from the main screen. | User logged in, on Home Page | 1. Go to / 2. Click user avatar or Profile link | — | Navigates to /profile. | Positive |
| TC-NAV-002 | Orders link accessible from Home | Checks the accessibility of the order history from the main navigation. | User logged in, on Home Page | 1. Go to / 2. Click Orders in navbar | — | Navigates to /orders. | Positive |
| TC-NAV-003 | Wishlist link accessible from Home | Ensures the wishlist is reachable from the global navigation bar. | User logged in, on Home Page | 1. Go to / 2. Click Wishlist in navbar | — | Navigates to /wishlist. | Positive |
| TC-NAV-004 | User can access all account pages in sequence | Validates a complete navigation traversal through all primary account sections. | User logged in | 1. Go to / then click Profile, verify /profile 2. Click Orders link, verify /orders 3. Click Cart icon, verify /cart 4. Go to /wishlist, verify URL | — | Each step results in correct URL: /profile, /orders, /cart, /wishlist | Positive |

---

## 13. Admin Panel Tests

**Prerequisites:** User is logged in as an Administrator (maaz+admin@gmail.com).

### 13.1 Dashboard and Navigation Tests
| TC ID | Test Case Title | Preconditions | Test Steps | Expected Result |
|---|---|---|---|---|
| TC-ADM-001 | Dashboard displays key stats | Admin on Dashboard | 1. Observe "Total Orders", "Total Users", "Active Support" cards | Stats are visible and values are >= 0. |
| TC-ADM-002 | Sidebar navigation works | Admin on Dashboard | 1. Click each link in the sidebar (Categories, Orders, Users, etc.) | Correct URL is loaded for each module. |
| TC-ADM-003 | Notifications screen is accessible | Admin on Dashboard | 1. Click Notifications icon 2. Click "View All" | Navigates to /notifications. List of alerts visible. |
| TC-ADM-004 | Admin profile is read-only | Admin on Profile | 1. Go to /admin/profile 2. Attempt to edit Email | Email field is disabled and cannot be edited. |

### 13.2 Products Management (CRUD)
| TC ID | Test Case Title | Preconditions | Test Steps | Expected Result |
|---|---|---|---|---|
| TC-ADM-005 | Admin can add a new product | Admin on Products page | 1. Click "+ Add Product" 2. Fill Name, Desc, Price, Stock 3. Select Category 4. Fill Image URL 5. Click Create | Success toast visible. Redirected to product list. |
| TC-ADM-006 | Admin can search for a product | Admin on Products page | 1. Enter product name in search bar | Table filters to show only matching products. |
| TC-ADM-007 | Admin can delete a product | Admin on Products page | 1. Click Delete on a product 2. Accept confirmation dialog | Success toast visible. Product removed from table. |

### 13.3 Categories Management
| TC ID | Test Case Title | Preconditions | Test Steps | Expected Result |
|---|---|---|---|---|
| TC-ADM-008 | Admin can create and delete category | Admin on Categories page | 1. Fill category name 2. Click Add 3. Verify in list 4. Click Delete | Category is added then successfully removed. |

### 13.4 Orders and Users
| TC ID | Test Case Title | Preconditions | Test Steps | Expected Result |
|---|---|---|---|---|
| TC-ADM-009 | Admin can update order status | Admin on Orders page | 1. Select new status from dropdown for an order | Status is updated. Success toast shown. |
| TC-ADM-010 | Admin can filter orders by status | Admin on Orders page | 1. Select a status from the header filter | Table only shows orders with that status. |
| TC-ADM-011 | Admin can view user directory | Admin on Users page | 1. Observe user table | Table shows Name, Email, and Role for all users. |

### 13.5 Support and Logs
| TC ID | Test Case Title | Preconditions | Test Steps | Expected Result |
|---|---|---|---|---|
| TC-ADM-012 | Admin can resolve support tickets | Admin on Support page | 1. Click Resolve on a pending ticket | Ticket status changes to Resolved. |
| TC-ADM-013 | Admin can sync activity logs | Admin on Activity Logs | 1. Click "Sync Logs" | Success message shown. Table refreshes with latest logs. |
| TC-ADM-014 | Admin can edit product price | Admin on Products | 1. Click Edit 2. Change price 3. Click Update | Success toast visible. Table reflects new price. |

---

## 14. Contact Page Tests

**Prerequisites:** User is on the /contact page.

| TC ID | Test Case Title | Preconditions | Test Steps | Expected Result |
|---|---|---|---|---|
| TC-CONT-001 | Successful form submission | Valid data entered | 1. Fill all fields 2. Click Send Message | "Message Received!" screen shown. |
| TC-CONT-002 | Empty field validation | Fields are empty | 1. Click Send Message | 4 validation error messages shown. |
| TC-CONT-003 | Invalid email validation | Invalid email format | 1. Enter invalid email 2. Click Send | "Enter a valid email address" shown. |
| TC-CONT-004 | Verify support info | Page loaded | 1. Observe right sidebar | Email, Phone, and Address are correct. |

---

## Test Execution Summary

| Suite | Total TCs | Positive | Negative |
|---|---|---|---|
| Signup | 7 | 5 | 2 |
| Login | 7 | 5 | 2 |
| Logout | 1 | 1 | 0 |
| Forgot Password | 4 | 4 | 0 |
| Navigation (Auth) | 2 | 2 | 0 |
| Cart | 13 | 13 | 0 |
| Checkout | 4 | 3 | 1 |
| Products | 6 | 6 | 0 |
| Profile | 6 | 6 | 0 |
| Orders | 5 | 5 | 0 |
| Wishlist | 6 | 6 | 0 |
| Navigation (Account) | 4 | 4 | 0 |
| Admin Panel | 14 | 14 | 0 |
| Contact Page | 4 | 3 | 1 |
| **TOTAL** | **83** | **77** | **6** |

---

*All test cases correspond 1-to-1 with the automated Playwright test suite in the Tests/ directory.*
