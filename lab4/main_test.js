const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://pptr.dev/');
    await page.waitForSelector('.DocSearch-Button'); 
    await page.click('.DocSearch-Button'); 
   
    const searchInputSelector = '#docsearch-input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa', {delay: 50});

    const searchResultSelector = '#docsearch-item-5 > a > div > div.DocSearch-Hit-content-wrapper > span.DocSearch-Hit-path';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector, {delay: 3000});
    
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector, {delay: 1000});
    await page.click(titleSelector);

    const title = await page.$eval(titleSelector, element => element.textContent);
    console.log(title);
    
    await browser.close();
})();
