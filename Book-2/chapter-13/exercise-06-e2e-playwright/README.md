# Exercise 6: E2E Testing with Playwright

**Difficulty:** Advanced
**Time:** 90-120 minutes
**Focus:** End-to-end testing, Playwright, browser automation, accessibility

---

## 🎯 Objectives

In this exercise, you'll learn:
- Setting up Playwright for E2E testing
- Writing end-to-end tests for critical user flows
- Testing across multiple browsers
- Visual regression testing
- Accessibility testing with axe
- Mobile responsive testing

---

## 📝 Scenario

You're ensuring your entire application works correctly from a user's perspective. You'll test critical paths like signup, login, and checkout across real browsers.

---

## ✅ Tasks

### Task 1: Setup Playwright (10%)
Install and configure Playwright with proper test structure.

### Task 2: Test Authentication Flow (25%)
Test signup → email verification → login → logout.

### Task 3: Test E-commerce Flow (30%)
Test browse → search → add to cart → checkout → confirmation.

### Task 4: Cross-Browser Testing (15%)
Run tests on Chrome, Firefox, Safari, and mobile viewports.

### Task 5: Accessibility Testing (20%)
Use axe-playwright to test for a11y violations.

---

## 🎓 Key Concepts

### Playwright Setup

```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
});
```

### Basic E2E Test

```javascript
import { test, expect } from '@playwright/test';

test('user can sign up', async ({ page }) => {
  await page.goto('/');

  // Click sign up
  await page.getByRole('link', { name: /sign up/i }).click();

  // Fill form
  await page.getByLabel(/email/i).fill('user@example.com');
  await page.getByLabel(/password/i).fill('SecurePass123!');
  await page.getByLabel(/confirm password/i).fill('SecurePass123!');

  // Submit
  await page.getByRole('button', { name: /create account/i }).click();

  // Verify success
  await expect(page.getByText(/welcome/i)).toBeVisible();
});
```

### Testing User Flows

```javascript
test('complete shopping flow', async ({ page }) => {
  await page.goto('/');

  // Browse products
  await page.getByRole('link', { name: /products/i }).click();
  await expect(page).toHaveURL(/.*products/);

  // Search
  await page.getByPlaceholder(/search/i).fill('laptop');
  await page.keyboard.press('Enter');

  // Add to cart
  await page.getByRole('button', { name: /add to cart/i }).first().click();

  // View cart
  await page.getByRole('link', { name: /cart/i }).click();
  await expect(page.getByText(/1 item/i)).toBeVisible();

  // Checkout
  await page.getByRole('button', { name: /checkout/i }).click();

  // Fill shipping
  await page.getByLabel(/address/i).fill('123 Main St');
  await page.getByLabel(/city/i).fill('New York');

  // Place order
  await page.getByRole('button', { name: /place order/i }).click();

  // Confirmation
  await expect(page.getByText(/order confirmed/i)).toBeVisible();
});
```

### Accessibility Testing

```javascript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('form is accessible', async ({ page }) => {
  await page.goto('/signup');

  const results = await new AxeBuilder({ page })
    .include('#signup-form')
    .analyze();

  expect(results.violations).toEqual([]);
});
```

### Visual Testing

```javascript
test('homepage matches screenshot', async ({ page }) => {
  await page.goto('/');

  // Take screenshot and compare
  await expect(page).toHaveScreenshot('homepage.png');
});

test('button states', async ({ page }) => {
  await page.goto('/components/button');

  // Normal state
  await expect(page.locator('.btn-primary')).toHaveScreenshot('button-normal.png');

  // Hover state
  await page.locator('.btn-primary').hover();
  await expect(page.locator('.btn-primary')).toHaveScreenshot('button-hover.png');
});
```

### Mobile Testing

```javascript
test('mobile navigation works', async ({ page }) => {
  // Set viewport to mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  // Mobile menu should be visible
  await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();

  // Click menu
  await page.getByRole('button', { name: /menu/i }).click();

  // Nav items visible
  await expect(page.getByRole('link', { name: /products/i })).toBeVisible();
});
```

---

## 🚀 Bonus Challenges

1. **API Mocking** ⭐⭐
   - Mock API responses in Playwright
   - Test offline scenarios

2. **Performance Testing** ⭐⭐
   - Measure page load times
   - Test Core Web Vitals

3. **Visual Regression** ⭐⭐⭐
   - Set up Percy or Chromatic
   - Automated visual diff reviews

4. **Parallel Testing** ⭐
   - Run tests in parallel
   - Optimize test suite speed

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Testing Library](https://testing-library.com/docs/pptr-testing-library/intro)
- [axe-playwright](https://github.com/abhinaba-ghosh/axe-playwright)
- [E2E Best Practices](https://playwright.dev/docs/best-practices)

---

**Happy Testing!** 🧪🌐

