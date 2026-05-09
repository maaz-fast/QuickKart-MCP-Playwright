// QuickKart Application Locators
// Primary and fallback selectors for all page elements

export const locators = {
  // ===================== COMMON/UTILITIES =====================
  common: {
    pageLoader: {
      primary: '[data-testid="page-loader"]',
      fallback: '.loading-spinner'
    }
  },

  // ===================== COMMON/NAVIGATION =====================
  navigation: {
    quickkartLogo: {
      primary: 'a[data-testid="navbar-logo"]',
      fallback: 'a[href="/"]'
    },
    homeLink: {
      primary: 'a[data-testid="navbar-home-link"]',
      fallback: 'a.nav-link:has-text("Home")'
    },
    contactLink: {
      primary: 'a[data-testid="navbar-contact-link"]',
      fallback: 'a[href="/contact"]'
    },
    ordersLink: {
      primary: 'a[data-testid="navbar-orders-link"]',
      fallback: 'a[href="/orders"]'
    },
    wishlistLink: {
      primary: 'a[data-testid="navbar-wishlist-link"]',
      fallback: 'a[href="/wishlist"]'
    },
    cartLink: {
      primary: 'a[data-testid="navbar-cart-link"]',
      fallback: 'a[data-testid="cart-icon"]'
    },
    cartCountBadge: {
      primary: 'span[data-testid="cart-count-badge"]',
      fallback: '.cart-badge'
    },
    notificationButton: {
      primary: 'button[data-testid="notification-icon"]',
      fallback: 'button.notification-btn'
    },
    themeToggleButton: {
      primary: 'button[data-testid="theme-toggle-button"]',
      fallback: 'button.theme-toggle'
    },
    userProfileLink: {
      primary: 'a[data-testid="navbar-username"]',
      fallback: 'a[href="/profile"]'
    },
    logoutButton: {
      primary: 'button[data-testid="logout-button"]',
      fallback: 'button:has-text("Logout")'
    },
    hamburgerMenu: {
      primary: 'button.hamburger',
      fallback: 'button >> nth=0'
    }
  },

  // ===================== LOGIN PAGE =====================
  loginPage: {
    heading: {
      primary: 'h1:has-text("Welcome back")',
      fallback: 'h1:has-text("Sign in to continue")'
    },
    emailInput: {
      primary: 'input[data-testid="email-input"]',
      fallback: 'input#login-email'
    },
    passwordInput: {
      primary: 'input[data-testid="password-input"]',
      fallback: 'input#login-password'
    },
    showPasswordButton: {
      primary: 'button[aria-label="Show password"]',
      fallback: 'button:has(svg), button:has(img)'
    },
    forgotPasswordLink: {
      primary: 'a:has-text("Forgot password?")',
      fallback: 'a[href="/forgot-password"]'
    },
    loginButton: {
      primary: 'button[data-testid="login-button"]',
      fallback: 'button:has-text("Sign In")'
    },
    createAccountLink: {
      primary: 'a:has-text("Create one")',
      fallback: 'a[href="/signup"]'
    }
  },

  // ===================== SIGNUP PAGE =====================
  signupPage: {
    heading: {
      primary: 'h1:has-text("Create account")',
      fallback: 'h1:has-text("Join QuickKart")'
    },
    fullNameInput: {
      primary: 'input[data-testid="name-input"]',
      fallback: 'input#signup-name'
    },
    emailInput: {
      primary: 'input[data-testid="email-input"]',
      fallback: 'input#signup-email'
    },
    passwordInput: {
      primary: 'input[data-testid="password-input"]',
      fallback: 'input#signup-password'
    },
    confirmPasswordInput: {
      primary: 'input[data-testid="confirm-password-input"]',
      fallback: 'input#signup-confirm-password'
    },
    showPasswordButton: {
      primary: 'button[aria-label="Show password"]',
      fallback: 'button:has(svg), button:has(img)'
    },
    showConfirmPasswordButton: {
      primary: 'button[aria-label="Show confirm password"]',
      fallback: 'button:has(svg), button:has(img) >> nth=1'
    },
    signupButton: {
      primary: 'button[data-testid="signup-button"]',
      fallback: 'button:has-text("Create Account")'
    },
    signinLink: {
      primary: 'a:has-text("Sign in")',
      fallback: 'a[href="/login"]'
    }
  },

  // ===================== FORGOT PASSWORD PAGE =====================
  forgotPasswordPage: {
    heading: {
      primary: 'h1:has-text("Forgot password?")',
      fallback: 'h1'
    },
    emailInput: {
      primary: 'input[data-testid="email-input"]',
      fallback: 'input#forgot-email'
    },
    verifyEmailButton: {
      primary: 'button[data-testid="forgot-password-submit-button"]',
      fallback: 'button:has-text("Verify Email")'
    },
    backToLoginLink: {
      primary: 'a:has-text("Back to Login")',
      fallback: 'a[href="/login"]'
    }
  },

  // ===================== RESET PASSWORD PAGE =====================
  resetPasswordPage: {
    heading: {
      primary: 'h1:has-text("Reset password")',
      fallback: 'h1'
    },
    emailDisplay: {
      primary: 'strong',
      fallback: 'p >> strong'
    },
    passwordInput: {
      primary: 'input[placeholder="Min. 6 characters"]',
      fallback: 'input[type="password"] >> nth=0'
    },
    confirmPasswordInput: {
      primary: 'input[placeholder="Repeat new password"]',
      fallback: 'input[type="password"] >> nth=1'
    },
    showPasswordButton: {
      primary: 'button[aria-label="Show password"]',
      fallback: 'button:has(svg) >> nth=0'
    },
    showConfirmPasswordButton: {
      primary: 'button[aria-label="Show confirm password"]',
      fallback: 'button:has(svg) >> nth=1'
    },
    resetButton: {
      primary: 'button:has-text("Reset Password")',
      fallback: 'button[type="submit"]'
    }
  },

  // ===================== CONTACT PAGE =====================
  contactPage: {
    heading: {
      primary: 'h1:has-text("Contact Us")',
      fallback: 'h1'
    },
    fullNameInput: {
      primary: 'input#name',
      fallback: 'input[placeholder="Your name"]'
    },
    emailInput: {
      primary: 'input#email',
      fallback: 'input[placeholder="Your email"]'
    },
    subjectInput: {
      primary: 'input#subject',
      fallback: 'input[placeholder="What can we help with?"]'
    },
    messageTextarea: {
      primary: 'textarea#message',
      fallback: 'textarea[placeholder="Write your message here..."]'
    },
    sendMessageButton: {
      primary: 'button.btn-primary:has-text("Send Message")',
      fallback: 'button >> nth=1'
    },
    errorMessages: {
      name: 'text="Full name is required"',
      email: 'text="Email is required"',
      invalidEmail: 'text="Enter a valid email address"',
      subject: 'text="Subject is required"',
      message: 'text="Message cannot be empty"'
    }
  },

  // ===================== HOME PAGE =====================
  homePage: {
    heading: {
      primary: 'h1[data-testid="home-page-title"]',
      fallback: 'h1'
    },
    productGrid: {
      primary: 'div[data-testid="products-grid"]',
      fallback: 'div.products-grid'
    },
    searchInput: {
      primary: 'input[data-testid="search-input"]',
      fallback: 'input[placeholder="Search products..."], input[type="search"]'
    },
    allCategoryButton: {
      primary: 'button:has-text("All")',
      fallback: 'button >> nth=0'
    },
    categoryButtons: {
      primary: 'button[data-testid^="category-tab-"]',
      fallback: 'button.category-tab'
    },
    productCard: {
      primary: 'div[data-testid^="product-card-"]',
      fallback: 'div.product-card'
    },
    loadingSpinner: {
      primary: 'div[data-testid="loading-spinner"]',
      fallback: '.skeleton-card'
    },
    nextPageButton: {
      primary: 'button[data-testid="next-page-button"]',
      fallback: 'button:has-text("Next →")'
    },
    minPriceInput: {
      primary: 'input[data-testid="min-price-filter"]',
      fallback: 'input[placeholder="Min $"]'
    },
    maxPriceInput: {
      primary: 'input[data-testid="max-price-filter"]',
      fallback: 'input[placeholder="Max $"]'
    }
  },

  // ===================== PRODUCT DETAILS PAGE =====================
  productPage: {
    productImage: {
      primary: 'img[alt*=""]',
      fallback: 'main img >> nth=0'
    },
    productName: {
      primary: 'h1[data-testid="product-detail-name"]',
      fallback: 'h1'
    },
    productPrice: {
      primary: 'text=/\\$[0-9]+\\.[0-9]{2}/',
      fallback: 'generic >> nth=0'
    },
    productDescription: {
      primary: '[data-testid="product-detail-description"]',
      fallback: 'p.product-detail-desc'
    },
    stockIndicator: {
      primary: '[data-testid="product-detail-stock"]',
      fallback: 'div:has-text("stock")'
    },
    quantityInput: {
      primary: 'span[data-testid="quantity-display"]',
      fallback: 'span.qty'
    },
    decrementButton: {
      primary: 'button[data-testid="quantity-decrease-button"]',
      fallback: 'button:has-text("−")'
    },
    incrementButton: {
      primary: 'button[data-testid="quantity-increase-button"]',
      fallback: 'button:has-text("+")'
    },
    addToCartButton: {
      primary: 'button[data-testid="add-to-cart-button"]',
      fallback: 'button:has-text("Add to Cart")'
    },
    addToWishlistButton: {
      primary: 'button:has-text("Add to Wishlist")',
      fallback: 'button >> nth=-1'
    },
    breadcrumb: {
      primary: 'nav >> button',
      fallback: 'button'
    }
  },

  // ===================== CART PAGE =====================
  cartPage: {
    heading: {
      primary: 'h1[data-testid="cart-page-title"]',
      fallback: 'h1'
    },
    emptyMessage: {
      primary: 'div[data-testid="empty-cart-state"]',
      fallback: 'h2:has-text("Your cart is empty")'
    },
    cartItems: {
      primary: 'div[data-testid^="cart-item-"]',
      fallback: 'div.cart-item'
    },
    itemImage: {
      primary: 'img[alt*=""]',
      fallback: 'img'
    },
    itemName: {
      primary: 'p',
      fallback: 'p'
    },
    itemPrice: {
      primary: 'text=/\\$[0-9]+\\.[0-9]{2}/',
      fallback: 'generic'
    },
    itemQuantity: {
      primary: 'text=/Qty:/[0-9]+/',
      fallback: 'strong'
    },
    cartItems: {
      primary: 'div[data-testid^="cart-item-"]',
      fallback: 'div.cart-item-card'
    },
    subtotalValue: {
      primary: 'span[data-testid="cart-subtotal"]',
      fallback: 'text=/Subtotal.*\\$[0-9]+\\.[0-9]{2}/'
    },
    shippingValue: {
      primary: 'span[data-testid="cart-shipping"]',
      fallback: 'text=/Shipping.*FREE/'
    },
    taxValue: {
      primary: 'span[data-testid="cart-tax"]',
      fallback: 'text=/Tax.*\\$[0-9]+\\.[0-9]{2}/'
    },
    totalValue: {
      primary: 'span[data-testid="cart-total"]',
      fallback: 'text=/Total.*\\$[0-9]+\\.[0-9]{2}/'
    },
    removeButton: {
      primary: 'button[data-testid^="remove-item-"]',
      fallback: 'button:has-text("Remove")'
    },
    proceedToCheckoutButton: {
      primary: 'button[data-testid="checkout-button"]',
      fallback: 'button:has-text("Proceed to Checkout")'
    },
    continueShoppingButton: {
      primary: 'button[data-testid="continue-shopping-button"]',
      fallback: 'button:has-text("Continue Shopping")'
    }
  },

  // ===================== CHECKOUT PAGE =====================
  checkoutPage: {
    heading: {
      primary: 'h1[data-testid="checkout-page-title"]',
      fallback: 'h1'
    },
    shippingHeading: {
      primary: 'h2:has-text("Shipping Information")',
      fallback: 'h2'
    },
    firstNameInput: {
      primary: 'input[data-testid="firstName-input"]',
      fallback: 'input[name="firstName"]'
    },
    lastNameInput: {
      primary: 'input[data-testid="lastName-input"]',
      fallback: 'input[name="lastName"]'
    },
    emailInput: {
      primary: 'input[data-testid="email-input"]',
      fallback: 'input[name="email"]'
    },
    phoneInput: {
      primary: 'input[data-testid="phone-input"]',
      fallback: 'input[name="phone"]'
    },
    countrySelector: {
      primary: 'button:has-text("Pakistan")',
      fallback: 'button'
    },
    streetAddressInput: {
      primary: 'input[data-testid="address-input"]',
      fallback: 'input[name="address"]'
    },
    cityInput: {
      primary: 'input[data-testid="city-input"]',
      fallback: 'input[name="city"]'
    },
    zipCodeInput: {
      primary: 'input[data-testid="zipCode-input"]',
      fallback: 'input[name="zipCode"]'
    },
    paymentHeading: {
      primary: 'h2:has-text("Payment Details")',
      fallback: 'h2 >> nth=1'
    },
    cardholderNameInput: {
      primary: 'input[data-testid="cardName-input"]',
      fallback: 'input[name="cardName"]'
    },
    cardNumberInput: {
      primary: 'input[data-testid="cardNumber-input"]',
      fallback: 'input[name="cardNumber"]'
    },
    expiryInput: {
      primary: 'input[data-testid="expiry-input"]',
      fallback: 'input[name="expiry"]'
    },
    cvvInput: {
      primary: 'input[data-testid="cvv-input"]',
      fallback: 'input[name="cvv"]'
    },
    orderSummaryHeading: {
      primary: 'h3:has-text("Order Summary")',
      fallback: 'h3'
    },
    placeOrderButton: {
      primary: 'button[data-testid="place-order-button"]',
      fallback: 'button:has-text("Place Order")'
    },
    validationError: {
      primary: 'span.field-error',
      fallback: 'div.error-message'
    }
  },

  // ===================== ORDERS PAGE =====================
  ordersPage: {
    heading: {
      primary: 'h1[data-testid="orders-page-title"]',
      fallback: 'h1:has-text("Orders")'
    },
    emptyMessage: {
      primary: 'div[data-testid="orders-empty-state"]',
      fallback: 'h2:has-text("No orders yet")'
    },
    ordersList: {
      primary: 'div[data-testid="orders-list"]',
      fallback: 'div.orders-list'
    }
  },

  // ===================== WISHLIST PAGE =====================
  wishlistPage: {
    heading: {
      primary: 'h1[data-testid="wishlist-page-title"]',
      fallback: 'h1:has-text("Your Wishlist")'
    },
    emptyMessage: {
      primary: 'div[data-testid="empty-wishlist-state"]',
      fallback: 'h2:has-text("Your wishlist is empty")'
    },
    wishlistItems: {
      primary: 'div[data-testid^="wishlist-item-"]',
      fallback: 'div.cart-item-card'
    },
    exploreButton: {
      primary: 'button[data-testid="wishlist-continue-shopping"]',
      fallback: 'button:has-text("Explore Products")'
    }
  },

  // ===================== PROFILE PAGE =====================
  profilePage: {
    heading: {
      primary: 'h1[data-testid="profile-page-title"]',
      fallback: 'h1'
    },
    userInfo: {
      primary: 'div[data-testid="profile-info-section"]',
      fallback: 'div.checkout-form-card'
    },
    userNameDisplay: {
      primary: 'p[data-testid="profile-user-name"]',
      fallback: 'div[data-testid="profile-info-section"] p'
    },
    userEmailDisplay: {
      primary: 'p[data-testid="profile-user-email"]',
      fallback: 'div[data-testid="profile-info-section"] p:nth-child(2)'
    },
    nameInput: {
      primary: 'input[data-testid="profile-name-input"]',
      fallback: 'input[name="name"]'
    },
    emailInput: {
      primary: 'input[data-testid="profile-email-input"]',
      fallback: 'input[name="email"]'
    },
    passwordInput: {
      primary: 'input[data-testid="profile-password-input"]',
      fallback: 'input[name="password"]'
    },
    confirmPasswordInput: {
      primary: 'input[data-testid="profile-confirm-password-input"]',
      fallback: 'input[name="confirmPassword"]'
    },
    saveButton: {
      primary: 'button[data-testid="profile-save-button"]',
      fallback: 'button:has-text("Save Profile")'
    },
    profileImageInput: {
      primary: 'input[data-testid="profile-image-upload"]',
      fallback: 'input[type="file"]'
    },
    profileImageUploadButton: {
      primary: 'div:has-text("Choose New Photo")',
      fallback: 'button:has-text("Choose New Photo")'
    },
    uploadingIndicator: {
      primary: 'text="Uploading"',
      fallback: 'div:has-text("Uploading")'
    }
  },

  // ===================== NOTIFICATIONS =====================
  notifications: {
    region: {
      primary: 'region[aria-label*="Notifications"]',
      fallback: 'div[class*="notification"]'
    },
    successAlert: {
      primary: 'text=/successfully/',
      fallback: 'text=/Success/'
    },
    errorAlert: {
      primary: 'text=/error/',
      fallback: 'text=/Error/'
    },
    closeButton: {
      primary: 'button:has-text("close")',
      fallback: 'button'
    }
  },

  // ===================== ADMIN PANEL =====================
  admin: {
    dashboard: {
      stats: {
        revenue: {
          primary: '[data-testid="stat-revenue"] h2',
          fallback: 'div:has-text("Total Revenue") ~ h2'
        },
        orders: {
          primary: '[data-testid="stat-orders"] h2',
          fallback: 'div:has-text("Total Orders") ~ h2'
        },
        products: {
          primary: '[data-testid="stat-products"] h2',
          fallback: 'div:has-text("Total Products") ~ h2'
        },
        users: {
          primary: '[data-testid="stat-users"] h2',
          fallback: 'div:has-text("Total Users") ~ h2'
        }
      }
    },
    sidebar: {
      dashboard: {
        primary: '[data-testid="admin-nav-dashboard"]',
        fallback: 'aside a:has-text("Dashboard")'
      },
      products: {
        primary: '[data-testid="admin-nav-products"]',
        fallback: 'aside a:has-text("Products")'
      },
      categories: {
        primary: '[data-testid="admin-nav-categories"]',
        fallback: 'aside a:has-text("Categories")'
      },
      orders: {
        primary: '[data-testid="admin-nav-orders"]',
        fallback: 'aside a:has-text("Orders")'
      },
      users: {
        primary: '[data-testid="admin-nav-users"]',
        fallback: 'aside a:has-text("Users")'
      },
      support: {
        primary: '[data-testid="admin-nav-support"]',
        fallback: 'aside a:has-text("Support")'
      },
      activityLogs: {
        primary: '[data-testid="admin-nav-activity-logs"]',
        fallback: 'aside a:has-text("Activity Logs")'
      }
    },
    usersPage: {
      tableRows: {
        primary: '[data-testid="admin-users-table"] tbody tr',
        fallback: 'tbody tr'
      },
      userName: '[data-testid="user-name"]',
      userEmail: '[data-testid="user-email"]',
      userRole: '[data-testid="user-role"]'
    },
    productsPage: {
      addProductBtn: {
        primary: '[data-testid="add-product-button"]',
        fallback: 'a:has-text("Add Product")'
      },
      searchBar: {
        primary: 'input[placeholder*="Search"]',
        fallback: 'input[type="text"]'
      },
      tableRows: {
        primary: 'tbody tr',
        fallback: '.product-list-row'
      },
      productName: '[data-testid="product-name"]',
      productCategory: '[data-testid="product-category"]',
      productPrice: '[data-testid="product-price"]'
    },
    notifications: {
      heading: {
        primary: 'h1:has-text("Notifications")',
        fallback: 'h1'
      },
      viewAllLink: {
        primary: 'a:has-text("View All Notifications")',
        fallback: 'a[href*="notifications"]'
      }
    },
    categoriesPage: {
      page: '[data-testid="admin-categories-page"]',
      nameInput: '[data-testid="new-category-input"]',
      addBtn: '[data-testid="add-category-btn"]',
      table: '[data-testid="admin-categories-table"]',
      row: '[data-testid^="category-row-"]',
      categoryName: '[data-testid="category-name"]',
      deleteBtn: '[data-testid^="delete-category-"]'
    },
    ordersPage: {
      page: '[data-testid="admin-orders-page"]',
      table: '[data-testid="admin-orders-table"]',
      row: '[data-testid^="admin-order-row-"]',
      filterDropdown: '[data-testid="admin-order-filter"]',
      statusBadge: '[data-testid="status-badge"]',
      statusUpdateBtn: '[data-testid^="status-update-"]',
      viewOrderBtn: '[data-testid^="view-order-"]'
    },
    supportPage: {
      tableRows: {
        primary: 'tbody tr',
        fallback: '.support-ticket-row'
      },
      resolveBtn: 'button:has-text("Resolve")',
      statusFilter: 'div:text("Status") + *'
    },
    activityLogsPage: {
      syncBtn: {
        primary: 'button:has-text("Sync Logs")',
        fallback: 'button.sync-btn'
      },
      tableRows: {
        primary: 'tbody tr',
        fallback: '.activity-log-row'
      },
      categoryFilter: {
        primary: '.custom-select-wrapper:has-text("ACTIVITY CATEGORY")',
        fallback: 'div:text("Activity Category") + *'
      },
      levelFilter: {
        primary: '.custom-select-wrapper:has-text("ACCESS LEVEL")',
        fallback: 'div:text("Access Level") + *'
      }
    }
  }
};

export default locators;
