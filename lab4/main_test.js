const puppeteer = require('puppeteer');

(async () => {
  // Launch browser and open new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Function to handle potential errors
  const handleError = (error) => {
    console.error('An error occurred:', error);
    browser.close();
  };

  // Navigate to the website
  page.goto('https://pptr.dev/')
    .catch(handleError);

  // Click the search button
  page.waitForSelector('button.DocSearch.DocSearch-Button')
    .then(() => page.click('button.DocSearch.DocSearch-Button'))
    .catch(handleError);

  // Type the search query
  page.waitForSelector('#docsearch-input')
    .then(() => page.type('#docsearch-input', 'chipi chipi chapa chapa'))
    .catch(handleError);

  // Wait for and click the first result in Docs section
  page.waitForSelector('#docsearch-item-5')
    .then(() => page.click('#docsearch-item-5'))
    .catch(handleError);

  // Extract and print the title
  page.waitForSelector('h1')
    .then(() => page.evaluate(() => document.querySelector('h1').textContent))
    .then(console.log)
    .catch(handleError)
    .finally(() => browser.close());
})();
