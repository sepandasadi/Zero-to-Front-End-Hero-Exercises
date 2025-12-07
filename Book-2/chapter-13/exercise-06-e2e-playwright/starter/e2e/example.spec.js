import { test, expect } from '@playwright/test';

/**
 * EXAMPLE E2E TEST
 *
 * This is a simple example to get you started.
 * TODO: Complete the tests in the other spec files!
 */

test.describe('Todo App - Example', () => {
  test('loads the application', async ({ page }) => {
    await page.goto('/');

    // Check that the app loaded
    await expect(page.locator('h1')).toContainText('Todo App');
  });

  test('has an input field', async ({ page }) => {
    await page.goto('/');

    // Check that input exists
    const input = page.getByTestId('todo-input');
    await expect(input).toBeVisible();
  });
});

