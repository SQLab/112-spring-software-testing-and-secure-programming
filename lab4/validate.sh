const playwright = require('playwright');

async function searchAndPrintTitle() {
  // 使用 Chromium 啟動瀏覽器
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  try {
    // 前往網站
    await page.goto('https://pptr.dev/');

    // 輸入搜尋文字
    await page.fill('#docsearch-input', 'chipi chipi chapa chapa');

    // 等待搜尋結果出現，並點擊第一個結果
    const firstResult = await page.waitForSelector('#docsearch-item-5 > a');
    await firstResult.click();

    // 取得並輸出標題
    const title = await page.title();
    console.log(title);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
}

searchAndPrintTitle();
