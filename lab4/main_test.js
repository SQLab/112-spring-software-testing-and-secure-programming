const puppeteer = require('puppeteer');

(async () => {
  // 啟動瀏覽器並開啟一個新的空白頁面
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 導航到指定的網站
  await page.goto('https://pptr.dev/');

  // 搜尋並點擊結果

  // 1. 使用 XPath 定位搜尋按鈕並點擊
  const searchButtonXPath = '//*[@class="DocSearch-Button"]';
  const searchButton = await page.$x(searchButtonXPath);
  await searchButton[0].click();

  // 2. 使用 XPath 定位搜尋輸入框並輸入文字
  const searchInputXPath = '//*[@class="DocSearch-Input"]';
  const searchInput = await page.$x(searchInputXPath);
  await searchInput[0].type('chipi chipi chapa chapa');

  // 3. 等待搜尋結果出現，並使用 CSS 選擇器點擊第一個結果
  await page.waitForSelector('#docsearch-item-0 > a');
  const firstResult = await page.$('#docsearch-item-0 > a');
  await firstResult.click();

  // 4. 使用 CSS 選擇器定位標題並取得文字
  await page.waitForSelector('h1');
  const titleElement = await page.$('h1');
  const titleText = await page.evaluate(el => el.textContent, titleElement);

  // 5. 列印標題
  console.log(titleText);

  // 關閉瀏覽器
  await browser.close();
})();
