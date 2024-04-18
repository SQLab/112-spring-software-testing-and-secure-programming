const puppeteer = require('puppeteer');

(async () => {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 前往指定網址
  await page.goto('https://pptr.dev/');

  // 輸入搜尋字詞並等待結果
  await page.type('#search', 'chipi chipi chapa chapa');
  await page.waitForSelector('.DocSearch-Hit-source');

  // 取得文件區塊的第一個結果並點擊
  const docsResult = await page.$('.DocSearch-Hit-source');
  await docsResult.click();

  // 獲取標題並印出
  const title = await page.title();
  console.log(title);

  // 關閉瀏覽器
  await browser.close();
})();
