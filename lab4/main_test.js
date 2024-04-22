const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();


    await page.goto('https://pptr.dev/');


    await page.setViewport({width: 1080, height: 1024});

    const searchButtonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);
    

    const searchInputSelector = '#docsearch-input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa');
    

    await new Promise(r => setTimeout(r,1000))
    const searchResultSelector = '#docsearch-item-5 a';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    const titleSelector = 'h1';
    const titleElement = await page.waitForSelector(titleSelector);
    const element = await page.$(titleSelector);
    const title = await titleElement.evaluate(el => el.textContent);


    console.log(title);

    await browser.close();
})();
