const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 前往指定網址
    await page.goto('https://pptr.dev/');

    // 1. 點擊搜尋按鈕 (簡化: 使用 CSS 選擇器直接點擊)
    await page.click('.DocSearch-Button');

    // 2. 輸入搜尋文字 (簡化: 使用 CSS 選擇器直接輸入)
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa', { delay: 50 }); // 稍微延遲輸入

    // 3. 等待並點擊第一個搜尋結果 (簡化: 使用更精確的選擇器)
    await page.waitForSelector('.DocSearch-Hit-source'); // 等待結果出現
    await page.click('.DocSearch-Hit-source'); // 點擊第一個結果的來源 (通常是標題)

    // 4. 取得並印出標題 (簡化: 使用 h1 標籤選擇器)
    const title = await page.$eval('h1', el => el.textContent);
    console.log(title);

    // 5. 關閉瀏覽器
    await browser.close();
})();
