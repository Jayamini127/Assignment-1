import { test, expect } from '@playwright/test';

test.describe('Negative Functional Tests – Swift Translator', () => {

  
  async function getTranslationOutput(page) {
    await page.waitForFunction(() => {
      const candidates = Array.from(document.querySelectorAll('div, span, p'));
      return candidates.some(c => c.innerText.trim().length > 0);
    }, { timeout: 120000 });

    const allElements = page.locator('div, span, p');
    const count = await allElements.count();
    for (let i = 0; i < count; i++) {
      const el = allElements.nth(i);
      const text = (await el.innerText()).trim();
      if (text.length > 0) return el;
    }

    throw new Error('No translation output found!');
  }

  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'load' });
    const inputBox = page.locator('textarea, input[type="text"]');
    await inputBox.first().waitFor({ state: 'visible', timeout: 20000 });
  });

  
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(6000); // 
  });


  
  test('Neg_Fun_0001 – Joined word without spacing', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'apichithrapatiyakbalanavaa');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('අපි චිත්‍රපටියක් බලනවා');
  });

  test('Neg_Fun_0002 – Unsupported symbols', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'Mama dhaen @@town%% ekata yanavaa');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('මම දැන් ටවුන් එකට යනවා');
  });

  test('Neg_Fun_0003 – Mixed numeric and word time', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'Mama adha 7 thirty PM gedhara yanavaa');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('මම අද 7.30 PM ගෙදර යනවා');
  });

  test('Neg_Fun_0004 – Repeated words not reduced', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'Mama mama mama adha oyath ekka gedhara yanna ennadha ?');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('මම අද ඔයත් එක්ක ගෙදර යන්න එන්නද ?');
  });

  test('Neg_Fun_0005 – Excessive punctuation', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'oyaa adha beheth bivvadha?!!!!!!!');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('ඔයා අද බෙහෙත් බිව්වද?');
  });

  test('Neg_Fun_0006 – Missing spaces in conditional', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'oyaa adha gedharayanavaanam mamath enavaa');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('ඔයා අද ගෙදර යනවා නම් මමත් එනවා');
  });

  test('Neg_Fun_0007 – Random capitalization', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'Api pANSAl yanaVAA');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('අපි පන්සල් යනවා');
  });

  test('Neg_Fun_0008 – Mixed language / untranslated words', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'HNB Matara branch ekee number eka dhannavadha ?');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('HNB මාතර බ්‍රාන්ච් එකේ නම්බර් එක දන්නවද ?');
  });

  test('Neg_Fun_0009 – Emoji not removed', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'eyaalaa trip ekak 😊 yanavaa');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('එයාලා trip එකක් යනවා');
  });

  test('Neg_Fun_0010 – Long joined sentence with quotes', async ({ page }) => {
    await page.fill('textarea, input[type="text"]', 'Madamkivvaa"assignmentekanextweeksubmitkaranna"kiyalaa');
    const outputBox = await getTranslationOutput(page);
    await expect(outputBox).not.toContainText('Madam කිව්වා "assignment එක next week submit කරන්න" කියලා');
  });

});
