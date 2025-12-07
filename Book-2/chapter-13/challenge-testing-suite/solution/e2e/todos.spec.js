import { test, expect } from '@playwright/test';

test.describe('Todo Management E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Login
    await page.click('[data-testid="toggle-mode-button"]');
    await page.fill('[data-testid="email-input"]', `user${Date.now()}@example.com`);
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('[data-testid="todos-page"]')).toBeVisible();
  });

  test('user can create a new todo', async ({ page }) => {
    await page.fill('[data-testid="todo-input"]', 'Buy milk');
    await page.click('[data-testid="add-todo-button"]');

    await expect(page.locator('[data-testid="todo-text"]').filter({ hasText: 'Buy milk' })).toBeVisible();
  });

  test('user can mark todo as complete', async ({ page }) => {
    // Create a todo
    await page.fill('[data-testid="todo-input"]', 'Complete this task');
    await page.click('[data-testid="add-todo-button"]');

    // Mark as complete
    await page.click('[data-testid="todo-checkbox"]');

    // Should have completed class
    await expect(page.locator('[data-testid="todo-item"]')).toHaveClass(/todo-item--completed/);
  });

  test('user can edit a todo', async ({ page }) => {
    // Create a todo
    await page.fill('[data-testid="todo-input"]', 'Original text');
    await page.click('[data-testid="add-todo-button"]');

    // Edit it
    await page.click('[data-testid="edit-todo-button"]');
    await page.fill('[data-testid="edit-todo-input"]', 'Updated text');
    await page.click('[data-testid="save-todo-button"]');

    await expect(page.locator('[data-testid="todo-text"]')).toContainText('Updated text');
  });

  test('user can delete a todo', async ({ page }) => {
    // Create a todo
    await page.fill('[data-testid="todo-input"]', 'Delete me');
    await page.click('[data-testid="add-todo-button"]');

    // Delete it
    await page.click('[data-testid="delete-todo-button"]');

    await expect(page.locator('[data-testid="todo-text"]').filter({ hasText: 'Delete me' })).not.toBeVisible();
  });

  test('user can filter todos', async ({ page }) => {
    // Create todos
    await page.fill('[data-testid="todo-input"]', 'Active todo');
    await page.click('[data-testid="add-todo-button"]');

    await page.fill('[data-testid="todo-input"]', 'Completed todo');
    await page.click('[data-testid="add-todo-button"]');

    // Complete second todo
    const checkboxes = page.locator('[data-testid="todo-checkbox"]');
    await checkboxes.nth(1).click();

    // Filter to active
    await page.click('[data-testid="filter-active"]');
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);

    // Filter to completed
    await page.click('[data-testid="filter-completed"]');
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);

    // Filter to all
    await page.click('[data-testid="filter-all"]');
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(2);
  });

  test('user can search todos', async ({ page }) => {
    // Create todos
    await page.fill('[data-testid="todo-input"]', 'Buy milk');
    await page.click('[data-testid="add-todo-button"]');

    await page.fill('[data-testid="todo-input"]', 'Walk dog');
    await page.click('[data-testid="add-todo-button"]');

    // Search
    await page.fill('[data-testid="search-input"]', 'buy');
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);

    // Clear search
    await page.click('[data-testid="clear-search"]');
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(2);
  });

  test('user can clear completed todos', async ({ page }) => {
    // Create and complete todos
    await page.fill('[data-testid="todo-input"]', 'Todo 1');
    await page.click('[data-testid="add-todo-button"]');

    await page.fill('[data-testid="todo-input"]', 'Todo 2');
    await page.click('[data-testid="add-todo-button"]');

    // Complete first todo
    const checkboxes = page.locator('[data-testid="todo-checkbox"]');
    await checkboxes.first().click();

    // Clear completed
    await page.click('[data-testid="clear-completed-button"]');

    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(1);
  });

  test('todos persist after page reload', async ({ page }) => {
    // Create a todo
    await page.fill('[data-testid="todo-input"]', 'Persistent todo');
    await page.click('[data-testid="add-todo-button"]');

    await expect(page.locator('[data-testid="todo-text"]')).toContainText('Persistent todo');

    // Reload page
    await page.reload();

    // Todo should still be there
    await expect(page.locator('[data-testid="todo-text"]')).toContainText('Persistent todo');
  });

  test('displays correct todo statistics', async ({ page }) => {
    // Create todos
    await page.fill('[data-testid="todo-input"]', 'Todo 1');
    await page.click('[data-testid="add-todo-button"]');

    await page.fill('[data-testid="todo-input"]', 'Todo 2');
    await page.click('[data-testid="add-todo-button"]');

    await page.fill('[data-testid="todo-input"]', 'Todo 3');
    await page.click('[data-testid="add-todo-button"]');

    // Complete one
    await page.locator('[data-testid="todo-checkbox"]').first().click();

    // Check stats
    await expect(page.locator('[data-testid="total-count"]')).toContainText('3');
    await expect(page.locator('[data-testid="active-count"]')).toContainText('2');
    await expect(page.locator('[data-testid="completed-count"]')).toContainText('1');
  });
});

