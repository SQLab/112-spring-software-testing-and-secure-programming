const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://pptr.dev/');

  // Type the search query into the search box
  await page.type('#search_input_react', 'chipi chipi chapa chapa');

  // Click the search button
  await page.click('#search_button_react');

  // Wait for the search results to load
  await page.waitForSelector('.DocSearch-Hit-source');

  // Get the first search result in the "Docs" section
  const firstResult = await page.$('.DocSearch-Hit.DocSearch-Hit--default:nth-child(1) a.DocSearch-Hit-source');

  // Click on the first result
  await firstResult.click();

  // Wait for the page to load and get the title
  await page.waitForSelector('.postHeader h1');
  const title = await page.evaluate(() => document.querySelector('.postHeader h1').innerText);

  // Print the title
  console.log(title);

  // Close the browser
  await browser.close();
})();
