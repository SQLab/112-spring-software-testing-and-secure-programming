const puppeteer = require('puppeteer');

async function searchAndPrintTitle() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the website
    await page.goto('https://pptr.dev/');

    // Click the search button
    const searchButtonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    // Type the search query
    const searchInputSelector = '#docsearch-input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa');

    // Wait for the search result and click the first result in the Docs section
    const firstDocResultSelector = '#docsearch-item-5 > a';
    await page.waitForSelector(firstDocResultSelector);
    await page.click(firstDocResultSelector);

    // Get the title of the page
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector);
    const titleElement = await page.$(titleSelector);
    const titleText = await page.evaluate(el => el.textContent, titleElement);

    // Print the title
    console.log(titleText);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

searchAndPrintTitle();
