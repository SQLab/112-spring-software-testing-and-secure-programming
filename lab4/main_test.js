const puppeteer = require('puppeteer');

(async () => {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 前往指定網址
  await page.goto('https://pptr.dev/');

  // 找到搜尋按鈕並點擊
  const searchButton = await page.$('.DocSearch-Button'); // 使用 class 選擇器
  await searchButton.click();

  // 輸入搜尋關鍵字
  const searchInput = await page.$('#docsearch-input'); // 使用 id 選擇器
  await searchInput.type('chipi chipi chapa chapa');

  // 等待搜尋結果出現
  await page.waitForSelector('#docsearch-item-5 > a');

  // 點擊文件分類中第一個結果
  const firstDocResult = await page.$('#docsearch-item-5 > a');
  await firstDocResult.click();

  // 等待標題元素出現
  await page.waitForSelector('h1');

  // 取得標題文字
  const titleElement = await page.$('h1');
  const titleText = await page.evaluate(el => el.textContent, titleElement);

  // 列印標題
  console.log(titleText);

  // 關閉瀏覽器
  await browser.close();
})();
