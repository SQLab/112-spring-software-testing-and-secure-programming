const puppeteer = require('puppeteer');

async function searchAndPrintTitle() {
  // Launch the browser in headless mode
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the website
    await page.goto('https://pptr.dev/');

    // Wait for search input and button elements to be available
    await page.waitForSelector('#docsearch-input');
    await page.waitForSelector('button.DocSearch.DocSearch-Button');

    // Enter search query and simulate pressing Enter key
    await page.type('#docsearch-input', 'chipi chipi chapa chapa');
    await page.keyboard.press('Enter');

    // Wait for the first search result in the Docs section
    await page.waitForSelector('#docsearch-item-5 > a');

    // Click on the first search result
    await page.click('#docsearch-item-5 > a');

    // Wait for the title element (h1) to load
    await page.waitForSelector('h1');

    // Extract and print the title text
    const title = await page.$eval('h1', el => el.textContent);
    console.log(title);
  } catch (error) {
    console.error('Error during execution:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

searchAndPrintTitle();
