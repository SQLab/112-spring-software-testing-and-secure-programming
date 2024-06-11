const puppeteer = require('puppeteer');

(async () => {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    await page.click('button.DocSearch.DocSearch-Button');

    // Type into search box
    await page.waitForSelector('#docsearch-input');

    // Wait for search result
    await page.type('#docsearch-input', 'chipi chipi chapa chapa', { delay: 150 });

    // Get the `Docs` result section
    await page.waitForSelector('#docsearch-item-5');

    // Click on first result in `Docs` section
    await page.click('#docsearch-item-5');

    // Locate the title
    let textSelector = await page.waitForSelector('h1');
    let title = await textSelector.evaluate(element => element.textContent);

    // Print the title
    console.log(title);


    // Close the browser
    await browser.close();
})();
