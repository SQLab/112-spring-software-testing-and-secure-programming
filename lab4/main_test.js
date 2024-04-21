const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 前往 https://pptr.dev/
    await page.goto('https://pptr.dev/');

    // Click search button
    await page.click('.DocSearch-Button-Placeholder');

    // Type into search box
    await page.waitForSelector('#docsearch-input');
    await page.type('#docsearch-input', 'chipi chipi chapa chapa');

    // Get and click the doc search resault
    await new Promise(r => setTimeout(r,1000))
    await page.waitForSelector('.DocSearch-Hit#docsearch-item-5');
    await page.click('.DocSearch-Hit#docsearch-item-5');

    // Locate the title
    let textSelector = await page.waitForSelector('h1');
    let title = await textSelector.evaluate(element=> element.textContent);

    // Print the title
    console.log(title);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();