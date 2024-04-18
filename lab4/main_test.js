const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並開啟一個新的空白頁面
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 導航頁面到指定的 URL
    await page.goto('https://pptr.dev/');

    // 找到搜索框並輸入 "chipi chipi chapa chapa"
    const searchBox = await page.$('input[type="search"]'); 
    await searchBox.type('chipi chipi chapa chapa');

    // 點擊搜索按鈕 (Alternative: 按下 Enter 鍵)
    // await page.click('button[type="submit"]'); // 原本的點擊方法
    await searchBox.press('Enter'); // 使用 Enter 鍵進行搜索

    // 等待搜索結果出現
    await page.waitForSelector('.DocSearch-Hit-source');

    // 找到 "Docs" 結果區塊
    const docsSection = await page.$('.DocSearch-Hit-source:nth-child(1)'); 

    // 點擊 "Docs" 區塊中的第一個結果
    const firstResult = await docsSection.$('a');
    await firstResult.click();

    // 等待頁面加载完成
    await page.waitForSelector('h1');

    // 找到標題元素並提取標題文字
    const titleElement = await page.$('h1');
    const title = await page.evaluate(el => el.textContent, titleElement);

    // 打印標題
    console.log(title);

    // 關閉瀏覽器
    await browser.close();
})();
