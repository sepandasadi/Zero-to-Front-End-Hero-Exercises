import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * E2E Accessibility Tests
 *
 * TODO: Implement accessibility tests using axe
 */

test.describe('Accessibility', () => {
  test('login page has no accessibility violations', async ({ page }) => {
    await page.goto('/login');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('todos page has no accessibility violations', async ({ page }) => {
    // TODO: Login first, then test todos page
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('keyboard navigation works', async ({ page }) => {
    // TODO: Test tab navigation through the app
  });
});

