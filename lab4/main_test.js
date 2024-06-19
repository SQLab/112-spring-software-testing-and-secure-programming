const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch(); 
    const page = await browser.newPage(); // 打開一個分頁
    //Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // 等待搜索框父元素出现
    await page.waitForSelector('.navbarSearchContainer_Bca1');

    await page.click('button.DocSearch.DocSearch-Button');
    // 等待搜索框内部的元素出现
    await page.waitForSelector('.DocSearch-Input');

    // 在搜索框内部查找输入框
    const input = await page.$('.DocSearch-Input');


    // 在搜索框内部输入关键词
    await input.type('chipi chipi chapa chapa');
    //await input.type('chipi chipi chapa chapa',{ delay: 500 });
    //await page.waitForNavigation();


    // Get the `Docs` result section
    await page.waitForSelector('.DocSearch-Hit');
    //await new Promise(resolve => setTimeout(resolve, 500));
    
    // Click on first result in `Docs` section
    await page.waitForSelector('li[id="docsearch-item-5"] a');
    await page.click("#docsearch-item-5");

  
    // 等待唯一 h1 元素出現並將其分配給變量
    const h1Element = await page.waitForSelector('h1');

    // 使用 evaluate 提取文字內容
    const fullTitle = await h1Element?.evaluate(el => el.textContent);

    // Print the full title
    console.log(fullTitle);  

    await browser.close();
})();
