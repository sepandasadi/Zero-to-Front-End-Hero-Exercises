import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility E2E', () => {
  test('login page has no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('todos page has no accessibility violations', async ({ page }) => {
    await page.goto('/');

    // Login
    await page.click('[data-testid="toggle-mode-button"]');
    await page.fill('[data-testid="email-input"]', `user${Date.now()}@example.com`);
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('keyboard navigation works on login page', async ({ page }) => {
    await page.goto('/');

    // Tab to email input
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="email-input"]')).toBeFocused();

    // Tab to password input
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="password-input"]')).toBeFocused();

    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="submit-button"]')).toBeFocused();
  });

  test('keyboard navigation works on todos page', async ({ page }) => {
    await page.goto('/');

    // Login
    await page.click('[data-testid="toggle-mode-button"]');
    await page.fill('[data-testid="email-input"]', `user${Date.now()}@example.com`);
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();

    // Create a todo via keyboard
    await page.keyboard.press('Tab'); // Skip to content
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // Theme toggle
    await page.keyboard.press('Tab'); // Logout
    await page.keyboard.press('Tab'); // Todo input

    await page.keyboard.type('Keyboard todo');
    await page.keyboard.press('Tab'); // Add button
    await page.keyboard.press('Enter');

    // Todo should be created
    await expect(page.locator('[data-testid="todo-text"]')).toContainText('Keyboard todo');
  });

  test('form inputs have proper labels', async ({ page }) => {
    await page.goto('/');

    // Email input has label
    const emailInput = page.locator('[data-testid="email-input"]');
    await expect(emailInput).toHaveAttribute('aria-label', expect.stringMatching(/.+/));

    // Password input has label
    const passwordInput = page.locator('[data-testid="password-input"]');
    await expect(passwordInput).toHaveAttribute('aria-label', expect.stringMatching(/.+/));
  });

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/');

    // Submit button
    const submitButton = page.locator('[data-testid="submit-button"]');
    const submitText = await submitButton.textContent();
    expect(submitText).toBeTruthy();

    // Theme toggle (after login)
    await page.click('[data-testid="toggle-mode-button"]');
    await page.fill('[data-testid="email-input"]', `user${Date.now()}@example.com`);
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    const ariaLabel = await themeToggle.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });

  test('error messages are announced', async ({ page }) => {
    await page.goto('/');

    // Try to submit with invalid credentials
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'WrongPass123!');
    await page.click('[data-testid="submit-button"]');

    // Error should have role="alert"
    const error = page.locator('[data-testid="auth-error"]');
    await expect(error).toHaveAttribute('role', 'alert');
  });
});

