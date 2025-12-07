import { test, expect } from '@playwright/test';

/**
 * CLEAR COMPLETED FUNCTIONALITY - SOLUTION
 *
 * E2E tests for clearing completed todos
 */

test.describe('Clear Completed', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not show clear button when no completed todos', async ({ page }) => {
    // Add an active todo
    await page.fill('[data-testid="todo-input"]', 'Active todo');
    await page.click('[data-testid="add-button"]');

    // Clear button should not exist
    await expect(page.getByTestId('clear-completed')).not.toBeVisible();
  });

  test('should show clear button when there are completed todos', async ({ page }) => {
    // Add and complete a todo
    await page.fill('[data-testid="todo-input"]', 'Complete me');
    await page.click('[data-testid="add-button"]');

    await page.locator('[type="checkbox"]').first().check();

    // Clear button should appear
    await expect(page.getByTestId('clear-completed')).toBeVisible();
  });

  test('should clear all completed todos', async ({ page }) => {
    // Add multiple todos
    const todos = ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4'];
    for (const todo of todos) {
      await page.fill('[data-testid="todo-input"]', todo);
      await page.click('[data-testid="add-button"]');
    }

    // Complete some todos
    const checkboxes = page.locator('[type="checkbox"]');
    await checkboxes.nth(0).check();
    await checkboxes.nth(2).check();

    // Click clear completed
    await page.click('[data-testid="clear-completed"]');

    // Verify only active todos remain
    await expect(page.getByTestId('todo-item')).toHaveCount(2);
    await expect(page.getByText('Todo 2')).toBeVisible();
    await expect(page.getByText('Todo 4')).toBeVisible();
    await expect(page.getByText('Todo 1')).not.toBeVisible();
    await expect(page.getByText('Todo 3')).not.toBeVisible();
  });

  test('should show correct count in clear button', async ({ page }) => {
    // Add and complete multiple todos
    for (let i = 1; i <= 3; i++) {
      await page.fill('[data-testid="todo-input"]', `Todo ${i}`);
      await page.click('[data-testid="add-button"]');
      await page.locator('[type="checkbox"]').nth(i - 1).check();
    }

    // Verify count in button
    await expect(page.getByTestId('clear-completed')).toContainText('3');
  });

  test('should hide clear button after clearing all completed', async ({ page }) => {
    // Add and complete a todo
    await page.fill('[data-testid="todo-input"]', 'Complete me');
    await page.click('[data-testid="add-button"]');
    await page.locator('[type="checkbox"]').first().check();

    // Clear completed
    await page.click('[data-testid="clear-completed"]');

    // Button should be hidden
    await expect(page.getByTestId('clear-completed')).not.toBeVisible();
  });
});

