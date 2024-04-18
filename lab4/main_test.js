const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 導航到指定網址
    await page.goto('https://pptr.dev/');

    // 1. 點擊搜尋按鈕
    // 使用更穩定的選擇器，等待搜尋框出現後再點擊按鈕
    await page.waitForSelector('.DocSearch-Input'); // 確保搜尋框已載入
    const searchSelector = '.DocSearch-Button';
    await page.waitForSelector(searchSelector);
    await page.click(searchSelector);

    // 2. 在搜尋框中輸入 'chipi chipi chapa chapa'
    const inputSelector = '.DocSearch-Input';
    await page.type(inputSelector, 'chipi chipi chapa chapa', { delay: 500 }); // 輸入速度調整

    // 3. 等待搜尋結果並點擊第一個結果
    // 使用更通用的選擇器，避免特定 ID 導致錯誤
    const itemSelector = '.DocSearch-Hit-source'; // 選擇所有搜尋結果
    await page.waitForSelector(itemSelector);
    const firstResult = await page.$$(itemSelector); // 取得所有結果元素
    await firstResult[0].click(); // 點擊第一個結果

    // 4. 定位標題並列印
    // 使用更精確的選擇器，確保取得正確的標題
    const titleSelector = '.postHeaderTitle'; 
    await page.waitForSelector(titleSelector);
    const titleElement = await page.$(titleSelector);
    const title = await page.evaluate(el => el.textContent, titleElement);
    console.log(title);

    // 5. 關閉瀏覽器
    await browser.close();
})();
