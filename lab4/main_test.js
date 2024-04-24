const puppeteer = require('puppeteer');

(async () => {
    // 啟動瀏覽器並打開一個新的空白頁面
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
        // 導航至指定網址
        await page.goto('https://pptr.dev/');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 點擊搜尋按鈕
        await page.click('button.DocSearch.DocSearch-Button');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 在搜尋框中輸入文字
        await page.waitForSelector('#docsearch-input');
        await page.type('#docsearch-input', 'chipi chipi chapa chapa', { delay: 1000 });
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 等待搜尋結果
        await page.waitForSelector('#docsearch-item-5');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 點擊「Docs」部分的第一個結果
        await page.click('#docsearch-item-5');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 定位標題
        await page.waitForSelector('h1');

        // 獲取標題元素的文字內容
        const title = await page.evaluate(() => {
            const titleElement = document.querySelector('h1');
            return titleElement.textContent;
        });
        console.log(title);
    }catch(error){
        console.error('An error occurred:', error);
    }finally{
        // 關閉瀏覽器
        await browser.close();}
})();
