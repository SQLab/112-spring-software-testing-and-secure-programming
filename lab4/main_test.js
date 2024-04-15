const puppeteer = require('puppeteer');

async function searchAndPrintTitle() {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 前往指定的網址
    await page.goto('https://pptr.dev/');

    // 搜尋關鍵字
    await searchForTerm(page, 'chipi chipi chapa chapa');

    // 取得並列印標題
    const title = await getPageTitle(page);
    console.log(title);
  } catch (error) {
    console.error('執行過程中發生錯誤：', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
}

async function searchForTerm(page, term) {
  // 點擊搜尋按鈕
  const searchButtonSelector = '.DocSearch-Button';
  await page.waitForSelector(searchButtonSelector);
  await page.click(searchButtonSelector);

  // 輸入搜尋文字
  const searchInputSelector = '#docsearch-input';
  await page.waitForSelector(searchInputSelector);
  await page.type(searchInputSelector, term);

  // 點擊 Docs 區段的第一個結果
  const firstDocResultSelector = '#docsearch-item-5 > a';
  await page.waitForSelector(firstDocResultSelector);
  await page.click(firstDocResultSelector);
}

async function getPageTitle(page) {
  // 等待標題元素出現
  const titleSelector = 'h1';
  await page.waitForSelector(titleSelector);

  // 取得標題文字
  const titleElement = await page.$(titleSelector);
  return await page.evaluate(el => el.textContent, titleElement);
}

searchAndPrintTitle();
