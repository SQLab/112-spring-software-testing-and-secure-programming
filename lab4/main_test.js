const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並打開新頁面
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 導航到目標網址
    await page.goto('https://pptr.dev/');

    // 等待搜尋按鈕出現並點擊
    await page.waitForSelector('.DocSearch-Button');
    await page.click('.DocSearch-Button');

    // 等待搜尋框出現並輸入查詢內容
    await page.waitForSelector('#docsearch-input');  // 確保搜尋框加载完成
    const searchInput = await page.$('#docsearch-input');
    await searchInput.type('chipi chipi chapa chapa');

    // ... (其餘程式碼與參考資料 4 相似，略) ...

    // 關閉瀏覽器
    await browser.close();
})();
