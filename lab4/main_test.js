const puppeteer = require('puppeteer');

(async () => {
    // Launch browser and open a new page
    let browser
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to the target URL
    await page.goto('https://pptr.dev/');

    // Locate and click the search button (obfuscated selector)
    const searchBtnSelector = '.DocSearch-Button';
    await page.waitForSelector(searchBtnSelector, { timeout: 2000 }); // Reduced timeout for speed
    await page.click(searchBtnSelector);

    // Type the search phrase into the search box (obfuscated selector)
    const searchInputSelector = '.DocSearch-Input';
    await page.waitForSelector(searchInputSelector, { timeout: 2000 });
    await page.type(searchInputSelector, 'chipi chipi chapa chapa'); 

    // Wait for and click the first search result in the Docs section (obfuscated selector)
    const firstResultSelector = '#docsearch-item-5 > a';
    await page.waitForSelector(firstResultSelector, { timeout: 3000 });
    await page.click(firstResultSelector);

    // Extract and print the title
    const titleSelector = 'h1'; // Maintained clear selector for readability
    await page.waitForSelector(titleSelector);
    const titleElement = await page.$(titleSelector);
    const titleText = await page.evaluate(el => el.textContent, titleElement);
    console.log(titleText);

    // Close the browser
    await browser.close();
})(); 
