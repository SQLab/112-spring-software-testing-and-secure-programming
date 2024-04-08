const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://pptr.dev/');

  // Click search button
  await page.click('[aria-label="Search"]');

  // Type into search box
  await page.type('#search-input input', 'chipi chipi chapa chapa');

  // Wait for search results to appear
  await page.waitForSelector('.DocSearch-Hits');

  // Get the `Docs` result section
  const docsSection = await page.$('.DocSearch-Hits');

  // Click on the first result in `Docs` section
  const firstResult = await docsSection.$('a');
  await firstResult.click();

  // Locate the title (assuming it's an h1 tag)
  const titleElement = await page.waitForSelector('h1');
  const title = await page.evaluate(el => el.textContent, titleElement);

  // Print the title
  console.log(title);

  // Close the browser
  await browser.close();
