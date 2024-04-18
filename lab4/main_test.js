const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新頁面
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 前往指定的網址
    await page.goto('https://pptr.dev/');

    // 方法一：使用CSS選擇器
    // 點擊搜尋框
    await page.click('#search');

    // 輸入搜尋字串
    await page.type('#search', 'chipi chipi chapa chapa');

    // 等待搜尋結果出現
    await page.waitForSelector('.DocSearch-Hit-source');

    // 取得所有文件搜尋結果
    const docsResults = await page.$$('.DocSearch-Hit-source');

    // 點擊第一個文件搜尋結果
    await docsResults[0].click();

    // 取得標題元素
    const titleElement = await page.$('.postHeaderTitle');
    const title = await page.evaluate(el => el.textContent, titleElement);

    // 顯示標題
    console.log(title);

    // 方法二：使用XPath選擇器
    // //*[@id="__docusaurus"]//input[@type="search"]
    // //*[@id="__docusaurus"]//article[1]//h1

    // 關閉瀏覽器
    await browser.close();
})();
