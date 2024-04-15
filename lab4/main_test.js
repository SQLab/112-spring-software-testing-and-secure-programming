const puppeteer = require('puppeteer');

(async () => {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 前往指定網址
  await page.goto('https://pptr.dev/');

  // 找到並點擊搜尋按鈕
  const searchButton = await page.$('.DocSearch-Button'); // 使用 CSS 選擇器
  await searchButton.click();

  // 輸入搜尋文字
  const searchInput = await page.$('#docsearch-input'); // 使用 CSS 選擇器
  await searchInput.type('chipi chipi chapa chapa');

  // 等待搜尋結果出現
  await page.waitForSelector('#docsearch-item-5 > a');

  // 取得文件類別搜尋結果區塊
  const docsResults = await page.$('#docsearch-list > div:nth-child(2)');

  // 在文件類別結果中點擊第一個連結
  const firstDocLink = await docsResults.$('a');
  await firstDocLink.click();

  // 等待標題元素出現並取得文字內容
  const titleElement = await page.waitForSelector('h1');
  const titleText = await page.evaluate(el => el.textContent, titleElement);

  // 印出標題文字
  console.log(titleText);

  // 關閉瀏覽器
  await browser.close();
})();
