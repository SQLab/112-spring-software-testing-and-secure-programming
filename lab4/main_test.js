const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟一個新的空白頁面
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 導航到指定的網站
    await page.goto('https://pptr.dev/');

    // 點擊搜尋按鈕 (Alternative solution using XPath)
    const searchButtonXPath = '//*[@class="DocSearch-Button"]';
    const searchButtonElement = await page.$x(searchButtonXPath);
    await searchButtonElement[0].click();

    // 輸入搜尋查詢字串
    const searchInputSelector = '#docsearch-input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa');

    // 等待搜尋結果並點擊文件區塊中的第一個結果 (Alternative solution using page.evaluate)
    await page.waitForSelector('#docsearch-item-5 > a');
    await page.evaluate(() => {
        document.querySelector('#docsearch-item-5 > a').click();
    });

    // 取得頁面的標題
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector);
    const titleElement = await page.$(titleSelector);
    const titleText = await page.evaluate(el => el.textContent, titleElement);

    // 列印標題
    console.log(titleText);

    // 關閉瀏覽器
    await browser.close();
})();
