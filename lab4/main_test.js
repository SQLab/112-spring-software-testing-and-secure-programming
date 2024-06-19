const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    
    // 1.Click search button
    const searchSelector = '.DocSearch-Button';
    await page.waitForSelector(searchSelector);
    await page.click(searchSelector);
    // 2.Type the phrase 'chipi chipi chapa chapa' into search box
    const inputSelector = '.DocSearch-Input';
    await page.waitForSelector(inputSelector);
    await page.type(inputSelector, 'chipi chipi chapa chapa', {delay: 1000});
    // 3.Wait and Click on the first result
    const itemSelector = '#docsearch-item-5';
    const linkSelector = await page.waitForSelector(itemSelector);
    await linkSelector.click();
    // 4-1.Locate the full title with a unique string
    const textSelector = await page.waitForSelector('h1');
    const fullTitle = await textSelector?.evaluate(el => el.textContent);
    // 4-2.Print the full title
    console.log(fullTitle);
    // 5.Close the browser
    await browser.close();
})();
