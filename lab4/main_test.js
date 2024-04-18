const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟一個新的空白頁面
  let browser
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 導航到指定的網站
    await page.goto('https://pptr.dev/');

    // 1. 點擊搜尋按鈕 (使用 CSS 選擇器)
    await page.waitForSelector('.DocSearch-Button'); // 等待搜尋按鈕出現
    await page.click('.DocSearch-Button'); // 點擊搜尋按鈕

    // 2. 輸入搜尋查詢字串 (使用 CSS 選擇器)
    await page.waitForSelector('.DocSearch-Input'); // 等待搜尋輸入框出現
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa'); // 輸入查詢字串

    // 3. 等待搜尋結果並點擊文件區塊中的第一個結果 (使用 CSS 選擇器)
    await page.waitForSelector('.DocSearch-Hit-source'); // 等待文件結果區塊出現
    const firstResult = await page.$('.DocSearch-Hit-source'); // 選擇第一個文件結果
    await firstResult.click(); // 點擊第一個文件結果

    // 4. 取得頁面的標題 (使用 CSS 選擇器)
    await page.waitForSelector('h1'); // 等待標題元素出現
    const titleElement = await page.$('h1'); // 選擇標題元素
    const titleText = await page.evaluate(el => el.textContent, titleElement); // 取得標題文字

    // 5. 列印標題
    console.log(titleText);

    // 6. 關閉瀏覽器
    await browser.close();
})();
