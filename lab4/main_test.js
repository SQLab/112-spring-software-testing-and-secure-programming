const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Click search button
    await page.click('.DocSearch.DocSearch-Button');

    // Type into search box
    await page.type('#docsearch-input', 'chipi chipi chapa chapa');

    // Wait for search result
    await page.waitForSelector('.devsite-result-item-link');

    // Get the `Docs` result section
    const docSection = await page.$('.devsite-result-item-link');

    // Click on first result in `Docs` section
    await docSection.click();

    // Locate the title
    const titleElement = await page.waitForSelector('h1');

    // Get the text content of the title element
    const title = await page.evaluate(titleElement => titleElement.textContent, titleElement);

    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();
