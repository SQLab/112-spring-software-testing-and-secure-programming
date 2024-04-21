const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://pptr.dev/');

  // Type "chipi chipi chapa chapa" into the search box
  await page.type('input[name="search"]', 'chipi chipi chapa chapa');

  // Press Enter to initiate the search
  await page.keyboard.press('Enter');

  // Wait for the page to load
  await page.waitForSelector('.docSearch-lunr');

  // Click on the first result in the Docs section
  await page.click('.docSearch-lunr .docSearch-lunr-title a');

  // Wait for the page to load
  await page.waitForSelector('.docTitle');

  // Get the title of the document
  const title = await page.$eval('.docTitle', el => el.textContent.trim());
  console.log('Title:', title);

  // Close the browser
  await browser.close();
})();