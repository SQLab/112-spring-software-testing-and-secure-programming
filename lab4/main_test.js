const playwright = require('playwright'); // 使用 Playwright 框架

(async () => {
  // 啟動瀏覽器並開啟新分頁 (使用 Firefox)
  const browser = await playwright.firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 前往指定的網址
  await page.goto('https://pptr.dev/');

  // 1. 點擊搜尋按鈕 (使用 XPath 選擇器)
  const searchButtonSelector = '//button[contains(@class, "DocSearch-Button")]';
  await page.waitForXPath(searchButtonSelector);
  const searchButton = await page.$x(searchButtonSelector);
  await searchButton[0].click();

  // 2. 輸入搜尋文字
  const searchInputSelector = '#docsearch-input';
  await page.waitForSelector(searchInputSelector);
  await page.fill(searchInputSelector, 'chipi chipi chapa chapa'); // 使用 fill 而不是 type

  // 3. 等待搜尋結果並點擊 Docs 區段的第一個結果 (使用 CSS 選擇器)
  const firstDocResultSelector = 'li#docsearch-item-5 > a';
  await page.waitForSelector(firstDocResultSelector);
  await page.click(firstDocResultSelector);

  // 4. 取得頁面標題
  const titleSelector = 'h1';
  await page.waitForSelector(titleSelector);
  const titleText = await page.textContent(titleSelector); // 使用 textContent 而不是 evaluate

  // 5. 印出標題
  console.log(titleText);

  // 關閉瀏覽器
  await browser.close();
})();
