import { test, expect } from '@playwright/test';

/**
 * TODO CRUD OPERATIONS
 *
 * TODO: Write E2E tests for:
 * - Adding a todo
 * - Completing a todo
 * - Deleting a todo
 * - Multiple todos
 */

test.describe('Todo CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should add a new todo', async ({ page }) => {
    // TODO: Write test
    // 1. Type in the input
    // 2. Click add button
    // 3. Verify todo appears in the list
  });

  test('should mark todo as complete', async ({ page }) => {
    // TODO: Write test
    // 1. Add a todo
    // 2. Click the checkbox
    // 3. Verify it has strikethrough styling
  });

  test('should delete a todo', async ({ page }) => {
    // TODO: Write test
    // 1. Add a todo
    // 2. Click delete button
    // 3. Verify todo is removed
  });
});

