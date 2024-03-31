const puppeteer = require('puppeteer');

(async () => {

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  // Navigate the page to a URL
  
  await page.goto('https://pptr.dev/');  
  await page.setViewport({width: 1080, height: 1024});

  // Click search button
  await page.click('.DocSearch-Button-Placeholder');
  
  // Type into search box
  await page.waitForSelector('.DocSearch-Input');
  await page.type('.DocSearch-Input', 'chipi chipi chapa chapa');

  await new Promise(resolve => setTimeout(resolve, 3000));
  // Wait and click on first result
  await page.waitForSelector('#docsearch-item-5');
  await page.click('#docsearch-item-5');



  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector('h1');
  const Title = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title is "%s".', Title);
  await browser.close();
})();
=======
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');

    // Hints:
    // Click search button
    // Type into search box
    // Wait for search result
    // Get the `Docs` result section
    // Click on first result in `Docs` section
    // Locate the title
    // Print the title

    // Close the browser
    await browser.close();
})();

