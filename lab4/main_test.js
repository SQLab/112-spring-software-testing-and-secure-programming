const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 前往 https://pptr.dev/
    await page.goto('https://pptr.dev/');

    //Located the search button
    await page.waitForSelector('.DocSearch-Button-Placeholder');
    await page.click('.DocSearch-Button-Placeholder');

    // Type and Wait for search result
    await page.waitForSelector('.DocSearch-Input'); 
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa'); 
    await page.waitForSelector('.DocSearch-Hits')

    // Get the `Docs` result section
    await page.waitForSelector('#docsearch-item-5 > a');

    // Click on first result in `Docs` section
    await page.click('#docsearch-item-5 > a');

    // Wait for new page to load
    await page.waitForNavigation();

    // Locate the title
    const title = await page.title();

    // Print the title
    console.log(title);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();