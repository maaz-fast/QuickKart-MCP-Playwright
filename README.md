# 🛒 QuickKart Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-282120?style=for-the-badge&logo=playwright&logoColor=45ba4b)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Allure](https://img.shields.io/badge/Allure_Report-FFC107?style=for-the-badge&logo=allure&logoColor=black)

Welcome to the **QuickKart Automation Framework**! This project is a complete, professional testing suite built to ensure the **QuickKart E-Commerce App** works perfectly every time. 🚀

We use **Playwright** and **JavaScript** to simulate real users—browsing products, adding to cart, and checking out—completely automatically.

---

## ✨ Key Features
- **100% Pass Rate**: Highly stable tests that handle loading screens and slow internet.
- **Smart Locators**: Uses modern `data-testid` attributes to find elements reliably.
- **Page Object Model (POM)**: Clean, organized code that is easy to read and maintain.
- **Automated & Manual**: Includes both automated scripts and a full [Manual Test Case Document](./ManualTestCases.md).
- **Beautiful Reports**: Detailed visual reports showing exactly what happened in every test.

---

## 🛠️ Tech Stack
- **Engine**: [Playwright](https://playwright.dev/) (Industry standard for web testing)
- **Language**: JavaScript
- **Reporting**: Allure Report & Playwright HTML Report
- **Architecture**: Page Object Model (POM)

---

## 📂 Project Structure
```text
├── 📂 Data          # Real-world test data (Emails, Addresses, etc.)
├── 📂 Locators      # Central home for finding buttons and inputs
├── 📂 Pages         # Logic for every screen (Login, Cart, Home)
├── 📂 Tests         # The actual test scripts (The "Brain")
├── 📂 Utils         # Helpful tools for cleaner code
├── 📄 ManualTestCases.md  # Step-by-step human readable tests
└── ⚙️ playwright.config.js # Global settings
```

---

## 🚀 Getting Started

### 1. Install the Project
First, make sure you have [Node.js](https://nodejs.org/) installed. Then run:
```bash
npm install
```

### 2. Running the Tests
You can run the tests in different ways depending on your needs:

| Command | What it does |
|---|---|
| `npm test` | Runs all tests fast in the background (Headless). |
| `npm run test:headed` | Runs tests and opens a browser window so you can watch. |
| `npm run test:ui` | Opens the Playwright UI for interactive debugging. |

---

## 📊 Viewing Reports

After the tests finish, you can see the results in two ways:

### **Playwright HTML Report** (Quick & Simple)
```bash
npx playwright show-report
```

### **Allure Report** (Professional & Detailed)
Generate and open a beautiful dashboard with one command:
```bash
npm run allure:report
```

---

## ✅ Coverage
Our suite covers every critical part of the shopping experience:
- 👤 **Account**: Signup, Login, Profile updates, and Logout.
- 🛍️ **Shopping**: Product search, category filtering, and product details.
- 🛒 **Cart**: Adding items, updating quantities, and persistence.
- 💳 **Checkout**: Full payment flow and order history validation.

---

## 💡 Pro Tips
- **Flakiness Fixed**: We've added smart waits to handle React's asynchronous nature.
- **Test Data**: Check `Data/db.json` to see the information used during tests.
- **Browser Choice**: Tests run on Chromium (Chrome) by default but are ready for Firefox and Safari.

---
*Created with ❤️ for high-quality software testing.*
