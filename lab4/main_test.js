const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to pptr.dev
    await page.goto('https://pptr.dev/');

    // Focus on the search input and type the query
    const searchInput = await page.$('input[placeholder="Search"]');
    await searchInput.focus();
    await page.keyboard.type('chipi chipi chapa chapa');

    // Wait for search results and click the first Docs result
    await page.waitForSelector('.DocSearch-Hit-source');
    const docResults = await page.$$('.DocSearch-Hit-source');
    const firstDocResult = docResults.find(el => el.textContent.includes('Docs'));
    await firstDocResult.click();

    // Extract and print the title of the page
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', h1 => h1.textContent.trim());
    console.log(title);

  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await browser.close();
  }
