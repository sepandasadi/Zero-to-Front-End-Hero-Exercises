import { test, expect } from '@playwright/test';

/**
 * FILTERING TESTS
 *
 * TODO: Write E2E tests for filtering functionality:
 * - All filter
 * - Active filter
 * - Completed filter
 */

test.describe('Todo Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should filter to show only active todos', async ({ page }) => {
    // TODO: Write test
    // 1. Add multiple todos
    // 2. Complete some of them
    // 3. Click "Active" filter
    // 4. Verify only uncompleted todos show
  });

  test('should filter to show only completed todos', async ({ page }) => {
    // TODO: Write test
  });

  test('should show all todos when "All" filter is selected', async ({ page }) => {
    // TODO: Write test
  });
});

