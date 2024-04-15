const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // 前往指定網址
        await page.goto('https://pptr.dev/');

        // 等待搜索框出現並輸入查詢字串
        const searchInput = await page.waitForSelector('#docsearch-input');
        await searchInput.type('chipi chipi chapa chapa');

        // 等待搜索按鈕出現並點擊
        const searchButton = await page.waitForSelector('.DocSearch-Button');
        await searchButton.click();

        // 等待 Docs 區塊的第一個結果出現並點擊
        const firstResult = await page.waitForSelector('#docsearch-item-5 > a');
        await firstResult.click();

        // 等待頁面標題出現並取得文字內容
        const titleElement = await page.waitForSelector('h1');
        const titleText = await page.evaluate(el => el.textContent, titleElement);

        // 輸出頁面標題
        console.log(titleText);
    } catch (error) {
        console.error('操作過程中發生錯誤:', error);
    } finally {
        // 關閉瀏覽器
        await browser.close();
    }
})();
