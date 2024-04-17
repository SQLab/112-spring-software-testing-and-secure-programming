const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    
    await page.click('.DocSearch.DocSearch-Button');
    await page.waitForSelector('.DocSearch-Input');
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa');
    
    await new Promise(r => setTimeout(r,1000))
    await page.waitForSelector('.DocSearch-Hit#docsearch-item-5');
    await page.click('.DocSearch-Hit#docsearch-item-5');
    
    await page.waitForSelector('h1');
    const text = await page.evaluate(() => {
      return document.querySelector('h1').innerText;
    });
    console.log(text)

    // Close the browser
    await browser.close();
})();
