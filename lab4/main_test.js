const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    await wait(100);
    await page.click('.DocSearch-Button');
    await wait(100);
    await page.waitForSelector('#docsearch-input');
    await wait(100);
    await page.type('#docsearch-input', 'chipi chipi chapa chapa');
    await wait(100);
    await page.waitForSelector('#docsearch-item-5 a');
    await wait(1000);
    await page.click('#docsearch-item-5');
    await page.waitForSelector('h1');
    await wait(100);
    const title = await page.evaluate(() => document.querySelector('h1').textContent);
    console.log(title);
    await browser.close();
})();
