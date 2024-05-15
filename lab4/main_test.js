const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    await page.click('.DocSearch-Button');
    await page.waitForSelector('#docsearch-input');
    await page.type('#docsearch-input', 'chipi chipi chapa chapa');
    await page.waitForSelector('#docsearch-item-5');
    await page.click('#docsearch-item-5');
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', element => element.textContent.trim());
    console.log(title);

    await browser.close();
})();
