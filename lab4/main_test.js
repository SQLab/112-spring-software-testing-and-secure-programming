const puppeteer = require('puppeteer');

async function getTitle() {
  // Launch browser and create a new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://pptr.dev/');

  // Click the search button
  const searchButton = await page.$('button.DocSearch.DocSearch-Button');
  await searchButton.click();

  // Type the search query
  const searchInput = await page.$('#docsearch-input');
  await searchInput.type('chipi chipi chapa chapa');

  // Wait for the results and find the Docs section
  const docsSection = await page.waitForSelector('#docsearch-item-5');

  // Click on the first result within the Docs section
  const firstResult = await docsSection.$('a');
  await firstResult.click();

  // Wait for the title element to load
  await page.waitForSelector('h1');

  // Extract and print the title
  const titleElement = await page.$('h1');
  const title = await page.evaluate(el => el.textContent, titleElement);
  console.log(title);

  // Close the browser
  await browser.close();
}

getTitle();
