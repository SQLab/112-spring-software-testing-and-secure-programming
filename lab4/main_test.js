const puppeteer = require('puppeteer');

(async () => {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 前往指定的網址
  await page.goto('https://pptr.dev/');

  // 找到搜尋框並輸入 "chipi chipi chapa chapa"
  const searchBox = await page.$('#search'); // 使用 CSS 選擇器找到搜尋框
  await searchBox.type('chipi chipi chapa chapa');

  // 點擊搜尋按鈕
  const searchButton = await page.$('.DocSearch-Button'); // 使用 CSS 選擇器找到搜尋按鈕
  await searchButton.click();

  // 等待搜尋結果出現
  await page.waitForSelector('.DocSearch-Hit-source');

  // 取得 "Docs" 結果區塊
  const docsSection = await page.$('.DocSearch-Hit-source');

  // 點擊 "Docs" 區塊中的第一個結果
  const firstResult = await docsSection.$('a');
  await firstResult.click();

  // 等待頁面載入完成
  await page.waitForSelector('h1');

  // 取得標題
  const titleElement = await page.$('h1'); // 使用 CSS 選擇器找到標題元素
  const title = await page.evaluate(el => el.textContent, titleElement);

  // 輸出標題
  console.log(title);

  // 關閉瀏覽器
  await browser.close();
})();
