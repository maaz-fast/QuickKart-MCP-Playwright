You are an MCP-assisted Playwright Automation Engineer.

Your task is to build a COMPLETE Playwright JavaScript automation framework for:

https://quickkart-shop-nine.vercel.app

---

## 🚨 IMPORTANT EXECUTION RULE (STRICT)

DO NOT start coding immediately.

You MUST follow this order:

STEP 1 → Analyze application using MCP
STEP 2 → Output analysis (pages, flows, elements, locators)
STEP 3 → THEN generate automation framework

If analysis is skipped, the solution is INVALID.

---

## PHASE 1: APPLICATION ANALYSIS (MANDATORY)

* Start MCP server
* Inspect full DOM
* Crawl entire application

Identify and list:

* All pages
* All user flows
* All buttons, forms, inputs
* Navigation links
* Validation messages
* Dynamic elements (alerts, toasts, loaders)

Capture locators using MCP with priority:

1. id
2. data-* attributes
3. label text
4. role/text selectors (last option)

OUTPUT REQUIRED:

* List of pages
* List of flows
* Key elements per page
* Locator strategy

---

## PHASE 2: PROJECT GENERATION

Create clean structure:

/Data
/Locators
/Pages
/Tests
/Utils

---

## LOCATORS

File: /Locators/locators.js

* Store ALL locators here
* Use primary + fallback

Example:
loginButton: {
primary: 'button[data-testid="login"]',
fallback: 'text=Login'
}

---

## BASE PAGE

File: /Pages/BasePage.js

Include reusable methods:

* click
* fill
* wait
* getText
* isVisible

MCP HEALING LOGIC:

* Try primary locator
* If fails → use fallback
* Retry before failing

---

## PAGE OBJECTS

Create:

HomePage.js
SignupPage.js
LoginPage.js
ProductPage.js
CartPage.js
CheckoutPage.js
ProfilePage.js (if exists)

Rules:

* Simple methods
* One responsibility per method
* Clear readable names
* Beginner-friendly code
* No complex logic

---

## TEST FILES

Create:

auth.spec.js
products.spec.js
cart.spec.js
checkout.spec.js
profile.spec.js

---

## TEST COVERAGE (FULL)

Authentication:

* Signup (valid + invalid)
* Login (valid + invalid)
* Logout

Products:

* View products
* Product details
* Search/filter (if available)

Cart:

* Add to cart
* Remove from cart
* Quantity validation

Checkout:

* Form validation
* Successful order

Profile:

* Any available user features

Also cover:

* Alerts
* Notifications
* Dynamic UI behavior

---

## DETAILED TEST COVERAGE RULE (VERY IMPORTANT)

Every page MUST be tested thoroughly.

For EACH page, include:

1. UI VALIDATION

* Page loads correctly
* All important elements are visible
* Buttons, inputs, labels are present

2. FUNCTIONAL TESTING

* All actions (click, submit, navigation) work correctly
* Positive scenarios (valid inputs)
* Negative scenarios (invalid inputs)

3. FIELD VALIDATION

* Required field checks
* Invalid data handling
* Error messages verification

4. NAVIGATION TESTING

* Correct page redirection
* URL validation
* Back/forward navigation (if applicable)

5. EDGE CASES

* Empty inputs
* Boundary values
* Duplicate actions (e.g., multiple clicks)

6. ASSERTIONS (MANDATORY)
   Each test MUST include:

* Visibility checks
* URL validation
* Text/message verification
* Success & error feedback

7. AVOID

* Duplicate test cases
* Unnecessary or unrealistic scenarios
* Overly complex logic

Ensure tests are:

* Small
* Focused
* Readable
* Beginner-friendly

---

## ASSERTIONS (MANDATORY)

Add assertions for EVERY step:

* Page URL
* Page visibility
* Element visibility
* Text/messages
* Cart totals
* Success/error feedback

---

## DATA-DRIVEN DESIGN

File: /Data/db.json

Store:

* Users
* Products
* Checkout data

Rules:

* DO NOT hardcode data in tests
* Always read from db.json

---

## REPORTING

* Use @playwright/test
* Add Allure reporting

---

## SCRIPTS (package.json)

Include:

npm test
npm run test:headed
npm run mcp:start
npm run mcp:test

---

## CODING RULES (STRICT)

* Keep code SIMPLE
* Beginner-friendly
* No advanced patterns
* Clear variable names
* Small readable functions
* Add short comments before each action

---

## FINAL REQUIREMENTS

* Use MCP for:

  * DOM analysis
  * Locator generation
  * Healing (fallback support)

* Cover FULL application (not partial)

* Ensure maintainable structure

* Ensure all flows are automated

* Ensure clean and readable code

---

## OUTPUT FORMAT

First show PHASE 1 (Analysis)

Then show PHASE 2 (Full Project Code)

---
