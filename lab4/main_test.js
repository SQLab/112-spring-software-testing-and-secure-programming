const puppeteer = require('puppeteer');

(async () => {
  // Launch browser and open a new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

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

  // Wait for and click the first result in Docs section
  const firstResultSelector = '#docsearch-item-5 > a';
  await page.waitForSelector(firstResultSelector);
  await page.click(firstResultSelector);

  // Extract and print the title
  const titleSelector = 'h1';
  await page.waitForSelector(titleSelector);
  const title = await page.$eval(titleSelector, el => el.textContent);
  console.log(title.trim());

  // Close the browser
  await browser.close();
})();
