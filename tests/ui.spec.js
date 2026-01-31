import { test, expect } from '@playwright/test';

test('Pos_UI_0001 – Verify automatic Sinhala output refresh during typing', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'load' });

  const inputField = page.locator('textarea, input[type="text"]').first();
  await expect(inputField).toBeVisible();

  // Type gradually to simulate real-time typing
  await inputField.type('Mama dhaen town ekata yanavaa', { delay: 150 });

  // Verify Sinhala output appears and updates
  const outputText = page.locator('div, span, p').filter({
    hasText: 'මම'
  }).first();

  await expect(outputText).toContainText('මම දැන් town එකට යනවා');
});
