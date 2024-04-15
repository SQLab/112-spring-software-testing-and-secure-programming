const puppeteer = require('puppeteer');

(async () => {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 前往指定網站
    await page.goto('https://pptr.dev/');

    // 等待搜尋框出現並輸入查詢字串
    const searchInput = await page.waitForSelector('#docsearch-input', { visible: true });
    await searchInput.type('chipi chipi chapa chapa');

    // 觸發搜尋事件（模擬按下 Enter 鍵）
    await page.keyboard.press('Enter');

    // 等待文件搜尋結果出現
    await page.waitForSelector('#docsearch-item-0');

    // 取得第一個文件搜尋結果的連結元素
    const firstDocResult = await page.$('#docsearch-item-0 a');

    // 點擊第一個文件搜尋結果
    await firstDocResult.click();

    // 等待頁面標題元素出現
    await page.waitForSelector('h1');

    // 取得頁面標題文字
    const title = await page.$eval('h1', h1 => h1.textContent);

    // 輸出頁面標題
    console.log(title);
  } catch (error) {
    console.error('搜尋過程中發生錯誤：', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
})();
