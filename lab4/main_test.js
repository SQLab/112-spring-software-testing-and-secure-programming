const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    await page.click('button.DocSearch.DocSearch-Button'); //點擊指定按鈕
    
    // Type into search box
    // Wait for search result
    await page.waitForSelector('#docsearch-input.DocSearch-Input'); //等待 id 為 docsearch-input 且具有 DocSearch-Input 類的元素出現在頁面上
    await page.type('#docsearch-input.DocSearch-Input', 'chipi chipi chapa chapa',{delay: 2000}); //將指定的文字 'chipi chipi chapa chapa' 輸入到 id 為 docsearch-input 且具有 DocSearch-Input 類的元素中

    // Get the `Docs` result section
    await page.waitForSelector('#docsearch-item-5.DocSearch-Hit'); //等待 id 為 docsearch-item-5 且具有 DocSearch-Hit 類的元素出現在頁面上
    // Click on first result in `Docs` section
    await page.click('#docsearch-item-5.DocSearch-Hit'); //點擊指定按鈕
    
    // Locate the title
    let titletext = await page.waitForSelector('#__docusaurus_skipToContent_fallback > div > div > main > div > div > div > div > article > div.theme-doc-markdown.markdown > h1'); //等待指定的元素出現在當前頁面上，並將內容存儲在變數 titletext 中
    let flag = await titletext.evaluate(element=> element.textContent); //使用 textContent 屬性來獲取指定文字內容
    
    // Print the title
    console.log(flag); //呈現指定內容
    
    // Close the browser
    await browser.close();
})();
