const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 前往指定的網址
    await page.goto('https://pptr.dev/');

    // 輸入搜尋文字
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa');
    // 使用 XPath 定位搜尋按鈕並點擊
    const searchButton = await page.$x('//*[@id="search-box"]/button');
    await searchButton[0].click();

    // 等待搜尋結果出現
    await page.waitForSelector('.DocSearch-Hit-source');

    // 使用 XPath 定位第一個 Docs 搜尋結果並點擊
    const firstDocResult = await page.$x('//*[@class="DocSearch-Hit-source"][1]/a');
    await firstDocResult[0].click();

    // 使用 XPath 定位標題元素並取得標題文字
    const titleElement = await page.$x('//*[@class="postHeaderTitle-root"]/span');
    const title = await page.evaluate(element => element.textContent, titleElement[0]);

    // 輸出標題
    console.log(title);

    // 關閉瀏覽器
    await browser.close();
})();
