const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 前往 https://pptr.dev/
    await page.goto('https://pptr.dev/');

    // Type into search box
    await page.type('#search input', 'chipi chipi chapa chapa');

    // Click search button
    await page.click('#search-button');

    // Wait for search result
    await page.waitForSelector('.search-results .doc');

    // Get the `Docs` result section
    const docsSection = await page.$('.search-results .doc');

    // Click on first result in `Docs` section
    await docsSection.click();

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