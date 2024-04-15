const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev/')
    .then(() => page.click('button.DocSearch.DocSearch-Button'))
    .then(() => page.waitForSelector('#docsearch-input'))
    .then(() => page.type('#docsearch-input', 'chipi chipi chapa chapa', { delay: 100 }))
    .then(() => page.waitForSelector('#docsearch-item-5'))
    .then(() => page.click('#docsearch-item-5'))
    .then(() => page.waitForSelector('h1'))
    .then(() => page.evaluate(() => document.querySelector('h1').textContent))
    .then(title => console.log(title))
    .catch(error => console.error('An error occurred:', error))
    .finally(() => browser.close());
})();
