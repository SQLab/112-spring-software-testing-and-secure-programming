const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev/');

  // 等待搜索框元素可見，最多等待60秒
  const searchInput = await waitForSelectorWithTimeout(page, '#search input', 60000);

  // 在搜索框中輸入文字
  await searchInput.type('chipi chipi chapa chapa');

  // 點擊搜索按鈕
  await Promise.all([
    searchInput.press('Enter'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ]);

  // 點擊 Docs 部分的第一個搜索結果
  await Promise.all([
    page.waitForSelector('.search-results .doc'),
    page.click('.search-results .doc')
  ]);

  // 等待新頁面加載完成
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // 獲取標題並print
  const title = await page.title();
  console.log(title);

  await browser.close();
})();

async function waitForSelectorWithTimeout(page, selector, timeout) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const element = await page.$(selector);
    if (element) {
      return element;
    }
    await page.waitForTimeout(100); // 等待100毫秒再進行下一次嘗試
  }
  throw new Error(`Timeout waiting for selector: ${selector}`);
}