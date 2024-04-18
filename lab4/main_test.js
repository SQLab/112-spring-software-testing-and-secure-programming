const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 前往指定網址
    await page.goto('https://pptr.dev/');

    // 1. 點擊搜尋按鈕 (簡化: 直接聚焦搜尋框)
    const inputSelector = '.DocSearch-Input';
    await page.waitForSelector(inputSelector);
    await page.focus(inputSelector); // 直接聚焦，跳過點擊按鈕

    // 2. 輸入搜尋詞彙
    await page.type(inputSelector, 'chipi chipi chapa chapa', { delay: 100 }); // 輸入速度加快

    // 3. 等待搜尋結果並點擊第一個結果 (簡化: 使用 evaluate 處理)
    const titleSelector = '#__docusaurus > div.main-wrapper > div > div > div > div > article > div.theme-doc-markdown.markdown > div.admonition.note > p:nth-child(2)';
    const title = await page.evaluate((selector) => {
        return document.querySelector(selector).textContent;
    }, titleSelector);

    // 4. 輸出標題
    console.log(title);

    // 5. 關閉瀏覽器
    await browser.close();
})();
