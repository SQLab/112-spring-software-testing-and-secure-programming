const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
//    const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        protocol: 'webDriverBiDi',
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
//    await page.goto('https://developer.chrome.com');
    // Hints:
    // Click search button
    await page.click("[aria-label='Search']");
    // Type into search box
    //await page.type("[input='DocSearch-Input']", 'chipi chipi chapa chapa', {delay: 100})
    await page.goto('https://pptr.dev/webdriver-bidi#measuring-progress',);
    // Wait for search result

    //const searchResultSelector='.deviste-result-item-link';
    //await page.waitForSelector(searchResultSelector);

    // Get the `Docs` result section
    // Click on first result in `Docs` section

    //await page.click(searchResultSelector);
    // Locate the title
    const textSelector = await page.waitForSelector(
        'text/Experimental WebDriver BiDi support'
    );
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    // Print the title
    console.log('%s',fullTitle);
    // Close the browser
    await browser.close();
})();
