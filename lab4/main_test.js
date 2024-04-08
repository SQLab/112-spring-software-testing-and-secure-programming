const puppeteer = require('puppeteer');

async function getTitle() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev/');

  // Wait for the search box to be visible and then type the query
  const searchBox = await page.waitForSelector('#docsearch-input');
  await searchBox.type('chipi chipi chapa chapa');

  // Wait for the results to load and target the first result in the "Docs" section
  await page.waitForSelector('#docsearch-item-5 > a');
  const firstResult = await page.$('#docsearch-item-5 > a'); 
  await firstResult.click();

  // Wait for the title of the new page to be visible and extract its text content
  await page.waitForSelector('h1');
  const title = await page.$eval('h1', (h1) => h1.textContent);

  console.log(title);

  await browser.close();
}

getTitle();
