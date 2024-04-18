const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 前往指定網址
    await page.goto('https://pptr.dev/');

    try {
        // 1. 點擊搜尋按鈕
        const searchSelector = '.DocSearch-Button';
        await page.waitForSelector(searchSelector); // 等待按鈕出現，避免錯誤
        await page.click(searchSelector);

        // 2. 在搜尋框中輸入 'chipi chipi chapa chapa'
        const inputSelector = '.DocSearch-Input';
        await page.waitForSelector(inputSelector); // 等待輸入框出現，避免錯誤
        await page.type(inputSelector, 'chipi chipi chapa chapa', { delay: 100 }); // 輸入文字，調整延遲以適應網路速度

        // 3. 等待並點擊第一個搜尋結果
        const itemSelector = '#docsearch-item-0'; // 使用更穩定的選擇器
        await page.waitForSelector(itemSelector);
        await page.click(itemSelector);

        // 4. 獲取並列印標題
        const titleSelector = 'h1';
        await page.waitForSelector(titleSelector);
        const title = await page.$eval(titleSelector, el => el.textContent);
        console.log(title);
    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        // 關閉瀏覽器
        await browser.close();
    }
})();
