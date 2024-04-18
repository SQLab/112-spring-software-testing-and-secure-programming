const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟新分頁
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 前往指定網址
    await page.goto('https://pptr.dev/');

    // 1. 點擊搜尋按鈕 (使用更簡潔的寫法)
    await page.click('.DocSearch-Button');

    // 2. 輸入搜尋詞彙 (使用更簡潔的寫法，並加入延遲避免過快輸入)
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa', { delay: 100 });

    // 3. 等待搜尋結果並點擊第一個結果 (使用更簡潔的寫法)
    await page.waitForSelector('#docsearch-item-5 a');
    await page.click('#docsearch-item-5 a');

    // 4. 取得標題並印出 (使用更簡潔的寫法)
    const title = await page.$eval('h1', el => el.textContent);
    console.log(title);

    // 5. 關閉瀏覽器
    await browser.close();
})();
