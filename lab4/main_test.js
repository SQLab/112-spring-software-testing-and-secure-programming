const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navigate the page to a URL
        await page.goto('https://pptr.dev/');

	// Hints:
    	// Click search button
    	// Type into search box
    	// Wait for search result
    	// Get the `Docs` result section
    	// Click on first result in `Docs` section
    	// Locate the title
    	// Print the title

        // Click search button
        await page.click('button.DocSearch.DocSearch-Button');

        // Type into search box
        await page.waitForSelector('#docsearch-input');
        await page.type('#docsearch-input', 'chipi chipi chapa chapa', { delay: 1000 });

        // Wait for search result
        await page.waitForSelector('#docsearch-item-5');

        // Click on first result in `Docs` section
        await page.click('#docsearch-item-5');

        // Locate the title
        await page.waitForSelector('h1');

        // Get the text content of the title element
        const title = await page.evaluate(() => {
            const titleElement = document.querySelector('h1');
            return titleElement.textContent;
        });

        // Print the title
        console.log(title);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
})();
