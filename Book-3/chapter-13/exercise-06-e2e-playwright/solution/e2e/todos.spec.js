import { test, expect } from '@playwright/test';

/**
 * TODO CRUD OPERATIONS - SOLUTION
 *
 * Comprehensive E2E tests for todo functionality
 */

test.describe('Todo CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should add a new todo', async ({ page }) => {
    // Fill in the input
    await page.fill('[data-testid="todo-input"]', 'Buy groceries');

    // Click add button
    await page.click('[data-testid="add-button"]');

    // Verify todo appears
    await expect(page.getByText('Buy groceries')).toBeVisible();

    // Verify input is cleared
    await expect(page.getByTestId('todo-input')).toHaveValue('');
  });

  test('should add multiple todos', async ({ page }) => {
    const todos = ['Buy milk', 'Walk dog', 'Read book'];

    for (const todo of todos) {
      await page.fill('[data-testid="todo-input"]', todo);
      await page.click('[data-testid="add-button"]');
    }

    // Verify all todos appear
    for (const todo of todos) {
      await expect(page.getByText(todo)).toBeVisible();
    }

    // Verify count
    await expect(page.getByTestId('todo-item')).toHaveCount(3);
  });

  test('should mark todo as complete', async ({ page }) => {
    // Add a todo
    await page.fill('[data-testid="todo-input"]', 'Complete this task');
    await page.click('[data-testid="add-button"]');

    // Get the checkbox
    const checkbox = page.locator('[type="checkbox"]').first();

    // Mark as complete
    await checkbox.check();

    // Verify checkbox is checked
    await expect(checkbox).toBeChecked();

    // Verify text has strikethrough
    const todoText = page.locator('.completed').first();
    await expect(todoText).toBeVisible();
  });

  test('should unmark completed todo', async ({ page }) => {
    // Add and complete a todo
    await page.fill('[data-testid="todo-input"]', 'Toggle me');
    await page.click('[data-testid="add-button"]');

    const checkbox = page.locator('[type="checkbox"]').first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Uncheck it
    await checkbox.uncheck();

    // Verify it's unchecked
    await expect(checkbox).not.toBeChecked();

    // Verify no strikethrough
    const completedText = page.locator('.completed');
    await expect(completedText).toHaveCount(0);
  });

  test('should delete a todo', async ({ page }) => {
    // Add todos
    await page.fill('[data-testid="todo-input"]', 'Keep this');
    await page.click('[data-testid="add-button"]');

    await page.fill('[data-testid="todo-input"]', 'Delete this');
    await page.click('[data-testid="add-button"]');

    // Get all delete buttons
    const deleteButtons = page.getByRole('button', { name: 'Delete' });

    // Delete the second todo
    await deleteButtons.nth(1).click();

    // Verify it's gone
    await expect(page.getByText('Delete this')).not.toBeVisible();
    await expect(page.getByText('Keep this')).toBeVisible();

    // Verify count
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
  });

  test('should not add empty todo', async ({ page }) => {
    // Try to add empty todo
    await page.click('[data-testid="add-button"]');

    // Verify no todo was added
    await expect(page.getByTestId('todo-item')).toHaveCount(0);
    await expect(page.getByTestId('empty-state')).toBeVisible();
  });

  test('should not add whitespace-only todo', async ({ page }) => {
    // Try to add whitespace
    await page.fill('[data-testid="todo-input"]', '   ');
    await page.click('[data-testid="add-button"]');

    // Verify no todo was added
    await expect(page.getByTestId('todo-item')).toHaveCount(0);
  });

  test('should show empty state when no todos', async ({ page }) => {
    await expect(page.getByTestId('empty-state')).toBeVisible();
    await expect(page.getByTestId('empty-state')).toContainText('No todos yet');
  });
});

