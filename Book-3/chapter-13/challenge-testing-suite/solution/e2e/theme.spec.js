import { test, expect } from '@playwright/test';

test.describe('Theme Toggle E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Login
    await page.click('[data-testid="toggle-mode-button"]');
    await page.fill('[data-testid="email-input"]', `user${Date.now()}@example.com`);
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();
  });

  test('user can toggle dark mode', async ({ page }) => {
    // Should start in light mode
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Toggle to dark
    await page.click('[data-testid="theme-toggle"]');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Toggle back to light
    await page.click('[data-testid="theme-toggle"]');
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('theme preference persists across page reload', async ({ page }) => {
    // Toggle to dark
    await page.click('[data-testid="theme-toggle"]');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    // Reload page
    await page.reload();

    // Should still be dark
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('theme button has correct aria-label', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]');

    // Light mode - should offer dark mode
    await expect(themeToggle).toHaveAttribute('aria-label', /dark mode/i);

    // Toggle to dark
    await page.click('[data-testid="theme-toggle"]');

    // Dark mode - should offer light mode
    await expect(themeToggle).toHaveAttribute('aria-label', /light mode/i);
  });

  test('theme button shows correct icon', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]');

    // Light mode - should show moon icon
    await expect(themeToggle).toContainText('🌙');

    // Toggle to dark
    await page.click('[data-testid="theme-toggle"]');

    // Dark mode - should show sun icon
    await expect(themeToggle).toContainText('☀️');
  });
});

