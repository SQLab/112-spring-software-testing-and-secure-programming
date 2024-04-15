const puppeteer = require('puppeteer');

async function searchAndPrintTitle() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://pptr.dev/');

    // 使用 XPath 選擇器點擊搜尋按鈕
    const [searchButton] = await page.$x("//button[contains(., 'Search')]");
    await searchButton.click();

    // 使用 CSS 選擇器輸入搜尋文字
    await page.type('#docsearch-input', 'chipi chipi chapa chapa');

    // 使用 CSS 選擇器並結合 nth-child 找到第一個 Docs 結果
    const firstDocResult = await page.$('#docsearch-results a:nth-child(1)');
    await firstDocResult.click();

    // 使用 CSS 選擇器获取标题
    const titleElement = await page.$('h1');
    const titleText = await page.evaluate(el => el.textContent, titleElement);

    console.log(titleText);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    await browser.close();
  }
}

searchAndPrintTitle();
