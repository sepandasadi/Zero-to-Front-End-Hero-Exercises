# Exercise 6: E2E with Playwright - Hints

## Playwright Basics

<details>
<summary>💡 Hint: Page navigation and waits</summary>

```javascript
import { test, expect } from '@playwright/test';

test('navigates and waits', async ({ page }) => {
  // Navigate
  await page.goto('/');

  // Wait for element
  await page.waitForSelector('h1');

  // Or use expect with auto-wait
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
```
</details>

<details>
<summary>💡 Hint: Interacting with elements</summary>

```javascript
test('fills and submits form', async ({ page }) => {
  await page.goto('/contact');

  // Fill inputs
  await page.getByLabel(/name/i).fill('John Doe');
  await page.getByLabel(/email/i).fill('john@example.com');
  await page.getByLabel(/message/i).fill('Hello!');

  // Select dropdown
  await page.getByLabel(/subject/i).selectOption('support');

  // Check checkbox
  await page.getByLabel(/subscribe/i).check();

  // Click button
  await page.getByRole('button', { name: /send/i }).click();

  // Verify
  await expect(page.getByText(/message sent/i)).toBeVisible();
});
```
</details>

<details>
<summary>💡 Hint: Testing accessibility</summary>

```javascript
import AxeBuilder from '@axe-core/playwright';

test('no a11y violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
```
</details>

---

**Test real user flows! Think like a user!** 🎭

