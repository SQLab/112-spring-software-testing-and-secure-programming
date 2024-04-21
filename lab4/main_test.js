const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 前往 https://pptr.dev/
  await page.goto('https://pptr.dev/');

  // 在搜尋框中輸入chipi chipi chapa chapa
  await page.type('#search input', 'chipi chipi chapa chapa');

  // 點擊搜索按鈕
  await page.click('#search-button');

  // 等待搜索結果頁面loading完成
  await page.waitForNavigation();

  // 點擊 Docs 的第1個搜索結果
  await page.click('.search-results .doc');

  // 等待新頁面loading完成
  await page.waitForNavigation();

  // 獲取標題並print
  const title = await page.title();
  console.log(title);

  // 關閉瀏覽器
  await browser.close();
})();