const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟一個新的空白頁面
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 導航到指定的網站
    await page.goto('https://pptr.dev/');

    // 點擊搜尋按鈕
    const searchButtonSelector = '.DocSearch-Button'; // 選擇搜尋按鈕
    await page.waitForSelector(searchButtonSelector); // 等待搜尋按鈕出現
    await page.click(searchButtonSelector); // 點擊搜尋按鈕

    // 輸入搜尋查詢字串
    const searchInputSelector = '.DocSearch-Input'; // 選擇搜尋輸入框
    await page.waitForSelector(searchInputSelector); // 等待搜尋輸入框出現
    await page.type(searchInputSelector, 'chipi chipi chapa chapa'); // 輸入查詢字串

    // 等待搜尋結果出現
    await page.waitForSelector('.DocSearch-Hit-source');

    // 取得文件區塊中的第一個結果
    const firstDocResultSelector = '.DocSearch-Hit-source'; // 選擇第一個文件結果
    const firstResultElement = await page.$(firstDocResultSelector);

    // 點擊第一個文件結果
    await firstResultElement.click();

    // 等待標題元素出現
    await page.waitForSelector('h1');

    // 取得頁面的標題
    const titleElement = await page.$('h1'); // 選擇標題元素
    const titleText = await page.evaluate(el => el.textContent, titleElement); // 取得標題文字

    // 列印標題
    console.log(titleText);

    // 關閉瀏覽器
    await browser.close();
})();
