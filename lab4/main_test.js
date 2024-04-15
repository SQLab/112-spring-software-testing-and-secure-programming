const puppeteer = require('puppeteer');

async function searchAndPrintTitle() {
  // 使用 'headless: false' 啟動瀏覽器 (可視化操作)
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://pptr.dev/');

    // 使用 XPath 選擇器定位搜索按鈕
    const searchButton = await page.$x("//button[contains(., 'Search')]");
    await searchButton[0].click();

    // 使用 CSS 選擇器定位搜索框
    const searchInput = await page.$('#docsearch-input');
    await searchInput.type('chipi chipi chapa chapa');

    // 使用 CSS 選擇器等待并点击第一个结果 (Docs 部分)
    const firstResult = await page.waitForSelector('#docsearch-item-5 > a');
    await firstResult.click();

    // 使用 CSS 選擇器获取页面标题
    const titleElement = await page.waitForSelector('h1');
    const titleText = await page.evaluate(el => el.textContent, titleElement);

    console.log(titleText);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    await browser.close();
  }
}

searchAndPrintTitle();
