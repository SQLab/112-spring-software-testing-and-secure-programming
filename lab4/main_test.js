const puppeteer = require('puppeteer');

async function searchAndPrintTitle() {
  // 啟動瀏覽器並開啟一個新的空白頁面
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 導航到指定的網站
    await page.goto('https://pptr.dev/');

    // 點擊搜尋按鈕
    const searchButtonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector); // 等待搜尋按鈕出現
    await page.click(searchButtonSelector); // 點擊搜尋按鈕

    // 輸入搜尋查詢字串
    const searchInputSelector = '#docsearch-input';
    await page.waitForSelector(searchInputSelector); // 等待搜尋輸入框出現
    await page.type(searchInputSelector, 'chipi chipi chapa chapa'); // 輸入查詢字串

    // 等待搜尋結果並點擊文件區塊中的第一個結果
    const firstDocResultSelector = '#docsearch-item-5 > a';
    await page.waitForSelector(firstDocResultSelector); // 等待第一個文件結果出現
    await page.click(firstDocResultSelector); // 點擊第一個文件結果

    // 取得頁面的標題
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector); // 等待標題元素出現
    const titleElement = await page.$(titleSelector); // 選擇標題元素
    const titleText = await page.evaluate(el => el.textContent, titleElement); // 取得標題文字

    // 列印標題
    console.log(titleText);
  } catch (error) {
    console.error('搜尋過程中發生錯誤：', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
}

searchAndPrintTitle();
