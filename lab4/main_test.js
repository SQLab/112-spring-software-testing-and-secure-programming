const playwright = require('playwright');

async function searchAndPrintTitle() {
  // 選擇 Chromium 瀏覽器
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://pptr.dev/');

    // 輸入搜尋文字並按下 Enter 鍵
    await page.fill('#docsearch-input', 'chipi chipi chapa chapa');
    await page.press('#docsearch-input', 'Enter');

    // 點擊第一個 Docs 結果 (使用 CSS 選擇器)
    await page.click('text=Docs >> a'); 

    // 取得標題並列印
    const title = await page.title();
    console.log(title);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    await browser.close();
  }
}

searchAndPrintTitle();
