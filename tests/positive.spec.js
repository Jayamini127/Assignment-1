import { test, expect } from '@playwright/test';

// Array of positive test cases
const positiveTests = [
  { input: 'mama paadam karanavaa', expected: 'මම පාඩම් කරනවා' },
  { input: 'oyaa hari kiyalaa matath hithenavaa, api ehenam ehema karamu.', expected: 'ඔයා හරි කියලා මටත් හිතෙනවා, අපි එහෙනම් එහෙම කරමු.' },
  { input: 'adha vaessa vunath mama vaedata yanna oona.', expected: 'අද වැස්ස වුනත් මම වැඩට යන්න ඕන.' },
  { input: 'oyaa adha gedhara yanavadha ?', expected: 'ඔයා අද ගෙදර යනවද ?' },
  { input: 'vahaama nishshabdha venna', expected: 'වහාම නිශ්ශබ්ද වෙන්න' },
  { input: 'oyaa eeka hariyata theerum aran', expected: 'ඔයා ඒක හරියට තේරුම් අරන්' },
  { input: 'oyaa eeka hariyata theerum aran naee', expected: 'ඔයා ඒක හරියට තේරුම් අරන් නෑ' },
  { input: 'suBha dhavasak ! adha oyaa monavadha karanna hithan innee ?', expected: 'සුභ දවසක් ! අද ඔයා මොනවද කරන්න හිතන් ඉන්නේ ?' },
  { input: 'mata mee paadama kiyala dhenna puluvandha ?', expected: 'මට මේ පාඩම කියල දෙන්න පුලුවන්ද ?' },
  { input: 'hari, mama paadama kiyala dhennam', expected: 'හරි, මම පාඩම කියල දෙන්නම්' },
  { input: 'Mata samaavenna, mama paara vaeradhiyata kiyala thiyenne', expected: 'මට සමාවෙන්න, මම පාර වැරදියට කියල තියෙන්නෙ' },
  { input: 'ohoma idhapan', expected: 'ඔහොම ඉදපන්' },
  { input: 'api chithrapatiyak balanavaa', expected: 'අපි චිත්‍රපටියක් බලනවා' },
  { input: 'mama iiyee gedhara vaeda ivara kalaa', expected: 'මම ඊයේ ගෙදර වැඩ ඉවර කලා' },
  { input: 'mama dhaen kaeema kanavaa', expected: 'මම දැන් කෑම කනවා' },
  { input: 'api iilaga sathiyee trip ekak yamu', expected: 'අපි ඊලග සතියේ trip එකක් යමු' },
  { input: 'mata kaeema epaa', expected: 'මට කෑම එපා' },
  { input: 'mama nidhaaganna hadhannee', expected: 'මම නිදාගන්න හදන්නේ' },
  { input: 'oyaalata adha lecture eka theeruNaadha?', expected: 'ඔයාලට අද lecture එක තේරුණාද?' },
  { input: 'puLuvannam mata mee paadama kiyalaa dhenavadha ?', expected: 'පුළුවන්නම් මට මේ පාඩම කියලා දෙනවද ?' },
  { input: 'mata oyaagee WiFi password eka kiyanna puLuvandha ?', expected: 'මට ඔයාගේ WiFi password එක කියන්න පුළුවන්ද ?' },
  { input: 'BOC Kandy branch ekee email eka evanna puLuvandha ?', expected: 'BOC Kandy branch එකේ email එක එවන්න පුළුවන්ද ?' },
  { input: 'web site ekee thiyana URL eka use karala app eka download karanna', expected: 'web site එකේ තියන URL එක use කරල app එක download කරන්න' },
  { input: 'oyaa mee app eka download kalaadha ?', expected: 'ඔයා මේ app එක download කලාද ?' },
  { input: 'Bag eka Rs.3500 kiyalaa gahala thibunaa', expected: 'Bag එක Rs.3500 කියලා ගහල තිබුනා' },
  { input: 'Adha meeting eka 8.00 PM vedhdhi end karanavaa kivvaa', expected: 'අද meeting එක 8.00 PM වෙද්දි end කරනවා කිව්වා' },
  { input: 'Assignment eka 31/1/2026 submit karanna thiyanavaa', expected: 'Assignment එක 31/1/2026 submit කරන්න තියනවා' },
  { input: 'medicine eka 5ml bonna kiyalaa doctor kiyuvaa', expected: 'medicine එක 5ml බොන්න කියලා doctor කියුවා' },
  { input: 'oyaa   kaeema   kaaladha ?', expected: 'ඔයා   කෑම   කාලද ?' },
  { input: 'Mama adha campus yanavaa \noyath enavadha ?', expected: 'මම අද campus යනවා \nඔයත් එනවද ?' },
  { input: 'aDhYaapana prathisQQskaraNayee dhaenata pavathina \narbudhakaarii thathvaya heethuven 6vana shreeNiyee \nnava prathisQQskaraNa labana vasarata kal dhaemuu \nathara anekuth prathisQQskaraNa mema vasaree sita \nkriyaathmaka keree', expected: 'අධ්‍යාපන ප්‍රතිසංස්කරණයේ දැනට පවතින \nඅර්බුදකාරී තත්වය හේතුවෙන් 6වන ශ්‍රේණියේ \nනව ප්‍රතිසංස්කරණ ලබන වසරට කල් දැමූ \nඅතර අනෙකුත් ප්‍රතිසංස්කරණ මෙම වසරේ සිට \nක්‍රියාත්මක කෙරේ' },
  { input: 'elakiri oyaage plan eka supiriyi', expected: 'එලකිරි ඔයාගෙ plan එක සුපිරියි' }
];

test.describe('Positive Functional Tests – Swift Translator', () => {

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
    await page.waitForTimeout(5000); // small pause to view results
  });

  // Loop through all test cases dynamically
  positiveTests.forEach(({ input, expected }) => {
    test(`Translate: "${input}"`, async ({ page }) => {
      await page.fill('textarea, input[type="text"]', input);
      const outputBox = await getTranslationOutput(page);
      await expect(outputBox).toContainText(expected);
    });
  });

});
