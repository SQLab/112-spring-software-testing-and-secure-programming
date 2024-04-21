const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 前往 https://pptr.dev/
  await page.goto('https://pptr.dev/');

  // 等待搜索框元素可見，最多等待10秒
  const searchInput = await page.waitForSelector('.DocSearch-Button-Placeholder', { timeout: 10000 });

  // 在搜索框中輸入文字
  await searchInput.type('chipi chipi chapa chapa');

  // 點擊搜索按鈕
  await page.click('.DocSearch-Button-Placeholder');

  // 等待搜索結果加載完成，最多等待10秒
  await page.waitForSelector('.search-results .doc', { timeout: 10000 });

  // 點擊 Docs 部分的第一個搜索結果
  await page.click('.search-results .doc');

  // 等待新頁面加載完成
  await page.waitForNavigation();

  // 獲取並打印標題
  const title = await page.title();
  console.log(title);

  // 關閉瀏覽器
  await browser.close();
})();