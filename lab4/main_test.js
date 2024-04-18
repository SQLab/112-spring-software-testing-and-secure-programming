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
    await page.waitForSelector('.DocSearch-Hit-source');
    const firstResult = await page.$('.DocSearch-Hit-source', { timeout: 3000 });
    await firstResult.click()
    // Extract and print the title
    await page.waitForSelector('h1')
    const titleElement = await page.$('h1');
     const titleText = await page.evaluate(el => el.textContent, titleElement);
    console.log(titleText);

    // Close the browser
    await browser.close();
})(); 
