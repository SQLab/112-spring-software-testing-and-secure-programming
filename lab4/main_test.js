const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 前往指定的網址
    await page.goto('https://pptr.dev/');

    // 等待搜尋按鈕出現並點擊
    const searchButtonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    // 等待搜尋輸入框出現並輸入查詢字串
    const searchInputSelector = '#docsearch-input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa');

    // 等待第一個文件結果出現並點擊
    const firstDocResultSelector = '#docsearch-item-5 > a';
    await page.waitForSelector(firstDocResultSelector);
    await page.click(firstDocResultSelector);

    // 等待標題元素出現並取得標題文字
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector);
    const titleElement = await page.$(titleSelector);
    const titleText = await page.evaluate(el => el.textContent, titleElement);

    // 印出標題
    console.log(titleText);

    // 關閉瀏覽器
    await browser.close();
})();
