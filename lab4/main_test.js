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
    await page.type('#docsearch-input', 'Experimental WebDriver BiDi support', { delay: 150 });

    // Wait for search result and click on the first result
    await page.waitForSelector('.DocSearch-Hit-content', { timeout: 60000 });
    await page.click('.DocSearch-Hit-content');

    // Locate the title
    let textSelector = await page.waitForSelector('h1', { timeout: 60000 });
    let title = await textSelector.evaluate(element => element.textContent);

    // Print the title
    console.log(title);

    // Close the browser
    await browser.close();
})();
