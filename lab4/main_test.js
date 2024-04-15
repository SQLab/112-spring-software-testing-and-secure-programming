const puppeteer = require('puppeteer');

async function searchAndPrintTitle() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://pptr.dev/');

    // 使用 XPath 點擊搜尋按鈕
    const searchButtonXPath = '//*[@class="DocSearch-Button"]';
    await page.waitForXPath(searchButtonXPath);
    const searchButton = await page.$x(searchButtonXPath);
    await searchButton[0].click();

    // 使用 XPath 輸入搜尋文字
    const searchInputXPath = '//*[@id="docsearch-input"]';
    await page.waitForXPath(searchInputXPath);
    const searchInput = await page.$x(searchInputXPath);
    await searchInput[0].type('chipi chipi chapa chapa');

    // 使用 XPath 點擊第一個 Docs 結果
    const firstDocResultXPath = '//*[@id="docsearch-hits"]/div[1]/div/a';
    await page.waitForXPath(firstDocResultXPath);
    const firstDocResult = await page.$x(firstDocResultXPath);
    await firstDocResult[0].click();

    // 使用 page.evaluate 取得標題
    const title = await page.evaluate(() => document.title);
    console.log(title);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    await browser.close();
  }
}

searchAndPrintTitle();
