const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://pptr.dev/');

  // Click search button using XPath
  await page.waitForXPath("//button[contains(@class, 'DocSearch-Button')]");
  const searchButton = await page.$x("//button[contains(@class, 'DocSearch-Button')]");
  await searchButton[0].click();

  // Type into search box using CSS selector
  await page.waitForSelector('#docsearch-input');
  await page.type('#docsearch-input', 'chipi chipi chapa chapa', { delay: 50 });

  // Wait for search results and click the first one using CSS selector
  await page.waitForSelector('.DocSearch-Hit-source');
  const firstResult = await page.$('.DocSearch-Hit-source');
  await firstResult.click();

  // Locate the title using CSS selector and print it
  await page.waitForSelector('h1');
  const titleElement = await page.$('h1');
  const title = await page.evaluate(el => el.textContent, titleElement);
  console.log(title);

  // Close the browser
  await browser.close();
})();
