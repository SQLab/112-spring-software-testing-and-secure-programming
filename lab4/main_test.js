const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 前往指定網址
    await page.goto('https://pptr.dev/');

    // 1. 點擊搜尋按鈕
    // 使用 XPath 選擇器定位搜尋按鈕，更具彈性
    const searchButtonXPath = '//*[@class="DocSearch-Button"]';
    await page.waitForXPath(searchButtonXPath);
    const searchButton = await page.$x(searchButtonXPath);
    await searchButton[0].click();

    // 2. 輸入搜尋詞彙 'chipi chipi chapa chapa'
    // 使用 CSS 選擇器定位搜尋框
    const inputSelector = '.DocSearch-Input';
    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, 'chipi chipi chapa chapa', { delay: 100 });

    // 3. 等待搜尋結果並點擊第一個結果
    // 使用 CSS 選擇器定位搜尋結果列表中的第一個項目
    const firstResultSelector = '.DocSearch-Hit-source';
    await page.waitForSelector(firstResultSelector);
    const firstResult = await page.$(firstResultSelector);
    await firstResult.click();

    // 4. 定位標題並列印
    // 使用 CSS 選擇器定位 h1 標題
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector);
    const titleElement = await page.$(titleSelector);
    const title = await page.evaluate(el => el.textContent, titleElement);
    console.log(title);

    // 5. 關閉瀏覽器
    await browser.close();
})();
