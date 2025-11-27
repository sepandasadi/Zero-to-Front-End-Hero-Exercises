// Example Playwright + axe-core integration (conceptual)
// Requires: @playwright/test, axe-core/playwright (or inject axe via page.addScriptTag)
import { test, expect } from '@playwright/test'

test('home has no obvious a11y violations', async ({ page }) => {
  await page.goto('http://localhost:3000')
  // Inject axe (one approach)
  await page.addScriptTag({ path: require.resolve('axe-core') })
  const results = await page.evaluate(async () => {
    // @ts-ignore
    return await axe.run(document, { runOnly: ['wcag2a','wcag2aa'] })
  })
  expect(results.violations).toEqual([])
})
