const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    
    await page.setViewport({width:1080 , height:1024 });
    
     // 抓取搜尋欄元素並點擊
    const searchResultSelector = '.DocSearch-Button';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    //等待輸入值並輸入
    await page.waitForSelector('.DocSearch-Input'); 
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa', {delay: 100});

    //等待doc第一個欄位並點擊
    await page.waitForSelector('#docsearch-item-5');
    await page.click('#docsearch-item-5');

    // Locate the title
    const titleSelector = await page.waitForSelector('h1');
    const fullTitle = await titleSelector?.evaluate(el => el.textContent);
    // Print the title
    console.log(fullTitle);

    // Close the browser
    await browser.close();    

})();
