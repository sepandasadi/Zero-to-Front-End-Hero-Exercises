import { test, expect } from '@playwright/test';

/**
 * FILTERING TESTS - SOLUTION
 *
 * E2E tests for todo filtering functionality
 */

test.describe('Todo Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Add some todos
    const todos = ['Active todo 1', 'Active todo 2', 'Will be completed'];
    for (const todo of todos) {
      await page.fill('[data-testid="todo-input"]', todo);
      await page.click('[data-testid="add-button"]');
    }

    // Complete one todo
    const checkboxes = page.locator('[type="checkbox"]');
    await checkboxes.nth(2).check();
  });

  test('should show all todos by default', async ({ page }) => {
    await expect(page.getByTestId('todo-item')).toHaveCount(3);

    // Verify all filter is active
    const allFilter = page.getByTestId('filter-all');
    await expect(allFilter).toHaveClass(/active/);
  });

  test('should filter to show only active todos', async ({ page }) => {
    // Click active filter
    await page.click('[data-testid="filter-active"]');

    // Verify only 2 active todos shown
    await expect(page.getByTestId('todo-item')).toHaveCount(2);
    await expect(page.getByText('Active todo 1')).toBeVisible();
    await expect(page.getByText('Active todo 2')).toBeVisible();
    await expect(page.getByText('Will be completed')).not.toBeVisible();

    // Verify active filter is highlighted
    await expect(page.getByTestId('filter-active')).toHaveClass(/active/);
  });

  test('should filter to show only completed todos', async ({ page }) => {
    // Click completed filter
    await page.click('[data-testid="filter-completed"]');

    // Verify only 1 completed todo shown
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByText('Will be completed')).toBeVisible();
    await expect(page.getByText('Active todo 1')).not.toBeVisible();

    // Verify completed filter is highlighted
    await expect(page.getByTestId('filter-completed')).toHaveClass(/active/);
  });

  test('should switch between filters', async ({ page }) => {
    // Start with all
    await expect(page.getByTestId('todo-item')).toHaveCount(3);

    // Switch to active
    await page.click('[data-testid="filter-active"]');
    await expect(page.getByTestId('todo-item')).toHaveCount(2);

    // Switch to completed
    await page.click('[data-testid="filter-completed"]');
    await expect(page.getByTestId('todo-item')).toHaveCount(1);

    // Switch back to all
    await page.click('[data-testid="filter-all"]');
    await expect(page.getByTestId('todo-item')).toHaveCount(3);
  });

  test('should show correct counts in filter buttons', async ({ page }) => {
    await expect(page.getByTestId('filter-all')).toContainText('3');
    await expect(page.getByTestId('filter-active')).toContainText('2');
    await expect(page.getByTestId('filter-completed')).toContainText('1');
  });

  test('should update filter counts when completing todo', async ({ page }) => {
    // Complete another todo
    const checkboxes = page.locator('[type="checkbox"]');
    await checkboxes.first().check();

    // Verify counts updated
    await expect(page.getByTestId('filter-all')).toContainText('3');
    await expect(page.getByTestId('filter-active')).toContainText('1');
    await expect(page.getByTestId('filter-completed')).toContainText('2');
  });

  test('should show empty state for filter with no todos', async ({ page }) => {
    // Complete all todos
    const checkboxes = page.locator('[type="checkbox"]');
    for (let i = 0; i < 3; i++) {
      await checkboxes.nth(i).check();
    }

    // Switch to active filter
    await page.click('[data-testid="filter-active"]');

    // Verify empty state
    await expect(page.getByTestId('empty-state')).toBeVisible();
    await expect(page.getByTestId('empty-state')).toContainText('No active todos');
  });
});

