const puppeteer = require('puppeteer');

async function interactWithPage() {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 導航到指定網址
    await page.goto('https://pptr.dev/');

    // 搜尋
    await page.waitForSelector('.DocSearch-Button'); // 等待搜尋按鈕出現
    await page.click('.DocSearch-Button'); // 點擊搜尋按鈕
    await page.type('#docsearch-input', 'chipi chipi chapa chapa'); // 輸入搜尋文字

    // 點擊 Docs 區段的第一個結果
    await page.waitForSelector('#docsearch-item-5 > a');
    await page.click('#docsearch-item-5 > a');

    // 獲取標題
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', element => element.textContent);
    console.log(title);
  } catch (error) {
    console.error('操作過程中發生錯誤:', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
}

interactWithPage();
