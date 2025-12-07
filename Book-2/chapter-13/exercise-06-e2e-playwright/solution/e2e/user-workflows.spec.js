import { test, expect } from '@playwright/test';

/**
 * USER WORKFLOWS - SOLUTION
 *
 * Complete end-to-end user scenarios
 */

test.describe('Complete User Workflows', () => {
  test('complete todo workflow: add, complete, filter, delete', async ({ page }) => {
    await page.goto('/');

    // Add multiple todos
    const todos = ['Buy groceries', 'Clean house', 'Study coding'];
    for (const todo of todos) {
      await page.fill('[data-testid="todo-input"]', todo);
      await page.click('[data-testid="add-button"]');
    }

    // Complete first todo
    await page.locator('[type="checkbox"]').first().check();

    // Filter to active
    await page.click('[data-testid="filter-active"]');
    await expect(page.getByTestId('todo-item')).toHaveCount(2);

    // Filter to completed
    await page.click('[data-testid="filter-completed"]');
    await expect(page.getByTestId('todo-item')).toHaveCount(1);

    // Back to all
    await page.click('[data-testid="filter-all"]');

    // Delete second todo
    const deleteButtons = page.getByRole('button', { name: 'Delete' });
    await deleteButtons.nth(1).click();

    // Verify final state
    await expect(page.getByTestId('todo-item')).toHaveCount(2);
    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('Study coding')).toBeVisible();
  });

  test('bulk operations workflow', async ({ page }) => {
    await page.goto('/');

    // Add 5 todos
    for (let i = 1; i <= 5; i++) {
      await page.fill('[data-testid="todo-input"]', `Task ${i}`);
      await page.click('[data-testid="add-button"]');
    }

    // Complete 3 of them
    const checkboxes = page.locator('[type="checkbox"]');
    await checkboxes.nth(0).check();
    await checkboxes.nth(2).check();
    await checkboxes.nth(4).check();

    // Verify counts
    await expect(page.getByTestId('filter-active')).toContainText('2');
    await expect(page.getByTestId('filter-completed')).toContainText('3');

    // Clear completed
    await page.click('[data-testid="clear-completed"]');

    // Verify only active remain
    await expect(page.getByTestId('todo-item')).toHaveCount(2);
    await expect(page.getByText('Task 2')).toBeVisible();
    await expect(page.getByText('Task 4')).toBeVisible();
  });

  test('interactive workflow with state changes', async ({ page }) => {
    await page.goto('/');

    // Add a todo
    await page.fill('[data-testid="todo-input"]', 'Dynamic todo');
    await page.click('[data-testid="add-button"]');

    // Check and uncheck multiple times
    const checkbox = page.locator('[type="checkbox"]').first();

    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Filter to completed
    await page.click('[data-testid="filter-completed"]');
    await expect(page.getByText('Dynamic todo')).toBeVisible();

    // Uncheck it
    await checkbox.uncheck();

    // Should disappear from completed filter
    await expect(page.getByTestId('empty-state')).toBeVisible();
  });

  test('keyboard navigation workflow', async ({ page }) => {
    await page.goto('/');

    // Focus input
    await page.getByTestId('todo-input').focus();

    // Type and press Enter to submit
    await page.keyboard.type('First todo');
    await page.keyboard.press('Enter');

    // Verify added
    await expect(page.getByText('First todo')).toBeVisible();

    // Add another with Enter
    await page.keyboard.type('Second todo');
    await page.keyboard.press('Enter');

    await expect(page.getByText('Second todo')).toBeVisible();
    await expect(page.getByTestId('todo-item')).toHaveCount(2);
  });
});

