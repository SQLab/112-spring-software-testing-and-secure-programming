const puppeteer = require('puppeteer');

async function getSearchResultTitle(searchTerm) {
  // Launch browser in headless mode
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to pptr.dev
    await page.goto('https://pptr.dev/');

    // Open search bar
    await page.click('button.DocSearch-Button');

    // Input search term and wait for results
    await page.type('#docsearch-input', searchTerm, { delay: 100 });
    await page.waitForSelector('.DocSearch-Dropdown-Container');

    // Identify the first result in the "Docs" section
    const firstDocResult = await page.$('#docsearch-item-0'); 

    // Click on the first result and wait for navigation
    await Promise.all([
      firstDocResult.click(),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    // Extract and return the title of the page
    const title = await page.title();
    return title;

  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

(async () => {
  // Call the function with the desired search term
  const title = await getSearchResultTitle('chipi chipi chapa chapa');
  console.log(title); 
})();
