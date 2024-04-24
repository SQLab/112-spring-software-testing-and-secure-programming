const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
  // Set screen size
  await page.setViewport({width: 1080, height: 1024});
    // Hints:
    // Click search button 
    await page.click('.DocSearch-Button-Placeholder');
    // Type into search box
    await page.waitForSelector('.DocSearch-Input');
    
    //await page.click('.docsearch-input');
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa');
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Wait for search result
    // Get the `Docs` result section
    
    await page.waitForSelector('.DocSearch-Hit#docsearch-item-5');
    // Click on first result in `Docs` section
    //#docsearch-item-5 > a:nth-child(1) > div:nth-child(1) > div:nth-child(1)
    //await page.click('.docsearch-item-5');
    await page.click('.DocSearch-Hits #docsearch-item-5');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Locate the title
    await page.waitForSelector('.markdown h1');
    const title = await page.evaluate(() => {
        return document.querySelector('.markdown h1').textContent;
    });

    console.log(title);
    // Print the title

    // Close the browser
    await browser.close();
})();
