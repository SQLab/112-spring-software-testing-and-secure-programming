const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // 前往指定的網址
    await page.goto('https://pptr.dev/');

    // 提示：
    // 點擊搜尋按鈕
    // 在搜尋框輸入文字
    // 等待搜尋結果
    // 取得 `Docs` 結果區塊
    // 點擊 `Docs` 區塊中的第一個結果
    // 定位標題
    // 印出標題

    // 以下為根據提示完成的程式碼：

    // 1. 點擊搜尋按鈕
    const searchButtonSelector = '.DocSearch-Button'; // 選擇搜尋按鈕
    await page.waitForSelector(searchButtonSelector); // 等待按鈕出現
    await page.click(searchButtonSelector); // 點擊按鈕

    // 2. 在搜尋框輸入文字
    const searchInputSelector = '#docsearch-input'; // 選擇搜尋框
    await page.waitForSelector(searchInputSelector); // 等待搜尋框出現
    await page.type(searchInputSelector, 'chipi chipi chapa chapa'); // 輸入文字

    // 3. 等待搜尋結果
    const firstDocResultSelector = '#docsearch-item-5 > a'; // 選擇第一個文件結果
    await page.waitForSelector(firstDocResultSelector); // 等待結果出現

    // 4. 點擊 `Docs` 區塊中的第一個結果
    await page.click(firstDocResultSelector); // 點擊結果

    // 5. 定位標題
    const titleSelector = 'h1'; // 選擇 h1 標題
    await page.waitForSelector(titleSelector); // 等待標題出現
    const titleElement = await page.$(titleSelector); // 取得標題元素

    // 6. 印出標題
    const titleText = await page.evaluate(el => el.textContent, titleElement); // 取得標題文字
    console.log(titleText); // 印出標題文字

    // 關閉瀏覽器
    await browser.close();
})();
