const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev/');

  // 等待搜索框元素可見
  await page.waitForSelector('#search input');

  // 在搜索框中輸入文字
  await page.type('#search input', 'chipi chipi chapa chapa');

  // 點擊搜索按鈕
  await page.click('#search-button');

  // 等待搜索結果頁面loading完成
  await page.waitForNavigation();

  // 點擊 Docs 部分的第1個搜索結果
  await page.click('.search-results .doc');

  // 等待新頁面loading完成
  await page.waitForNavigation();

  // 獲取title並print
  const title = await page.title();
  console.log(title);

  await browser.close();
})();