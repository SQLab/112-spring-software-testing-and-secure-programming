const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        slowMo: 100,
    });
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto('https://pptr.dev/');

    // Click search button to activate search input
    await page.click('.DocSearch-Button');

    // Wait for the search input to appear and type the search query
    await page.waitForSelector('.DocSearch-Input');
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa');

    // Wait for the search results to appear
    await page.waitForSelector('.DocSearch-Dropdown-Container');

    // Click on the first result in the "Docs" section
    await page.waitForSelector('.DocSearch-Hit');
    await page.click('#docsearch-item-5');

    // Retrieve and print the title
    const textSelector = await page.waitForSelector(
        'h1'
    );
    const title = await textSelector?.evaluate(el => el.textContent);
    console.log(title);


    await browser.close();
})();
