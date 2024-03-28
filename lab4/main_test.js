const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    await page.click('.searchbox [type="submit"]');

    // Type into search box
    await page.type('.searchbox input', 'search query');

    // Wait for search result
    await page.waitForSelector('.search-results');

    // Get the `Docs` result section
    const docsSection = await page.$('.search-results .section[data-section="Docs"]');

    // Click on first result in `Docs` section
    const firstResult = await docsSection.$('.search-results-item');
    await firstResult.click();

    // Locate the title
    const titleElement = await page.$('h1');
    const title = await page.evaluate(titleElement => titleElement.textContent, titleElement);

    // Print the title
    console.log('Title:', title);

    // Close the browser
    await browser.close();
})();
