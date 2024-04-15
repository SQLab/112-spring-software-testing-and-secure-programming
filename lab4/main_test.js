const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://pptr.dev/');

  try {
    // 等待搜尋框出現，增加超時時間
    await page.waitForSelector('#docsearch-input', { timeout: 60000 });

    // 模糊搜尋，提高容錯率
    await page.type('#docsearch-input', 'chipi chipi chapa chapa', { delay: 100 }); 

    // 等待搜尋結果
    await page.waitForSelector('#docsearch-item-0');

    // 取得 Docs 區塊
    const docsSection = await page.$('.DocSearch-Dropdown-Container');

    // 點擊 Docs 區塊中的第一個結果
    const firstDocResult = await docsSection.$('a');
    await firstDocResult.click();

    // 等待標題元素出現
    await page.waitForSelector('h1');

    // 取得標題文字
    const titleElement = await page.$('h1');
    const titleText = await page.evaluate(el => el.textContent, titleElement);

    // 列印標題
    console.log(titleText);
  } catch (error) {
    console.error('搜尋過程中發生錯誤：', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
})();
