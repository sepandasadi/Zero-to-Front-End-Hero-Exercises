import { test, expect } from '@playwright/test';

test.describe('Authentication E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user can sign up with valid credentials', async ({ page }) => {
    // Click signup toggle
    await page.click('[data-testid="toggle-mode-button"]');

    // Fill signup form
    await page.fill('[data-testid="email-input"]', 'newuser@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');

    // Submit
    await page.click('[data-testid="submit-button"]');

    // Should redirect to todos page
    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();

    // Should show user email
    await expect(page.locator('[data-testid="user-email"]')).toContainText('newuser@example.com');
  });

  test('user can log in with existing credentials', async ({ page, context }) => {
    // First signup
    await page.click('[data-testid="toggle-mode-button"]');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();

    // Logout
    await page.click('[data-testid="logout-button"]');
    await expect(page.locator('[data-testid="login-page"]')).toBeVisible();

    // Login
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    // Should be back on todos page
    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();
  });

  test('user can log out', async ({ page }) => {
    // Signup first
    await page.click('[data-testid="toggle-mode-button"]');
    await page.fill('[data-testid="email-input"]', 'logout@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();

    // Logout
    await page.click('[data-testid="logout-button"]');

    // Should be on login page
    await expect(page.locator('[data-testid="login-page"]')).toBeVisible();
  });

  test('shows error for invalid email', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="auth-error"]')).toBeVisible();
  });

  test('shows error for weak password on signup', async ({ page }) => {
    await page.click('[data-testid="toggle-mode-button"]');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'weak');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="auth-error"]')).toBeVisible();
  });

  test('protects todos route when not authenticated', async ({ page }) => {
    // Try to access todos page directly
    await page.goto('/');

    // Should be redirected to login
    await expect(page.locator('[data-testid="login-page"]')).toBeVisible();
  });

  test('session persists across page reload', async ({ page }) => {
    // Signup
    await page.click('[data-testid="toggle-mode-button"]');
    await page.fill('[data-testid="email-input"]', 'persist@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();

    // Reload page
    await page.reload();

    // Should still be authenticated
    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-email"]')).toContainText('persist@example.com');
  });
});

