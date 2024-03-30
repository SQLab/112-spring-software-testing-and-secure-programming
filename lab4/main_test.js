const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Click search button
    await page.click('.DocSearch.DocSearch-Button');

    // Type into search box
    await page.type('#docsearch-input', 'chipi chipi chapa chapa');

    // Wait for search result
    const searchResultSelector = '.devsite-result-item-link';

    // Get the `Docs` result section
    await page.waitForSelector('#docsearch-item-5'); 

    // Click on first result in `Docs` section
    await page.click('#docsearch-item-5'); 

    // Locate the title
    const textSelector = await page.waitForSelector('h1');  
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the title
    console.log(fullTitle);

    // Close the browser
    await browser.close();
})();
