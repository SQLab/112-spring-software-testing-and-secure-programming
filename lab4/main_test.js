const puppeteer = require('puppeteer');

(async () => {
  // 啟動無頭模式瀏覽器並建立新分頁
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // 設定瀏覽器視窗大小
  await page.setViewport({ width: 1280, height: 800 });
  
  try {
    // 前往指定網址
    await page.goto('https://pptr.dev/');

    // 使用 XPath 選擇器點擊搜尋按鈕
    const searchButtonXPath = '//*[@class="DocSearch-Button"]';
    await page.waitForXPath(searchButtonXPath);
    const searchButtonElement = await page.$x(searchButtonXPath);
    await searchButtonElement[0].click();

    // 輸入搜尋文字並模擬按下 Enter 鍵
    await page.type('#docsearch-input', 'chipi chipi chapa chapa');
    await page.keyboard.press('Enter');

    // 等待特定文字的搜尋結果出現
    await page.waitForXPath("//*[contains(text(), 'API Reference')]");

    // 點擊包含特定文字的搜尋結果
    const resultXPath = "//*[contains(text(), 'API Reference')]";
    const results = await page.$x(resultXPath);
    await results[0].click();

    // 取得頁面標題並轉換為大寫
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector);
    const titleText = await page.$eval(titleSelector, el => el.textContent.toUpperCase());

    // 顯示處理後的標題
    console.log('頁面標題 (大寫):', titleText);

  } catch (error) {
    console.error('發生錯誤:', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
})();
