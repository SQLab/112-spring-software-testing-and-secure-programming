const puppeteer = require('puppeteer');

(async () => {

    // 啟動瀏覽器並開啟新的空白頁面
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 將頁面導覽到某個 URL
    await page.goto('https://pptr.dev/');

    // Hints:點選搜尋按鈕
    await page.click('button.DocSearch.DocSearch-Button');
	
    // 在搜尋框中輸入
    await page.waitForSelector('#docsearch-input');
    await page.type('#docsearch-input', 'chipi chipi chapa chapa',{delay: 1000});
	
    //等待搜尋結果， 取得 `Docs` 結果部分
    await page.waitForSelector('#docsearch-item-5');
	
    // 點擊「Docs」部分中的第一個結果
    await page.click('#docsearch-item-5');
	
    //找到標題
    let textSelector = await page.waitForSelector('h1');
    let title = await textSelector.evaluate(element=> element.textContent);
	
    // 列印標題
    console.log(title);
	
    // 關閉瀏覽器
    await browser.close();
})();
