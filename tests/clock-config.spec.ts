import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

test('App should render all 3 cities from Excel config', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Upload Config' }).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(fileURLToPath(new URL('./fixtures/clock-config-3cities.csv', import.meta.url)));

  await expect(page.getByText('Berlin').first()).toBeVisible();
  await expect(page.getByText('Singapore').first()).toBeVisible();
  await expect(page.getByText('Shanghai').first()).toBeVisible();
});
