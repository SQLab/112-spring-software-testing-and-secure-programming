const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev/');

  // Click the search button using its precise selector
  await page.click('#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.navbarSearchContainer_Bca1 > button');

  // Type the search query with a slight delay for better responsiveness
  await page.type('#docsearch-input', 'chipi chipi chapa chapa', { delay: 50 });

  // Wait for the specific search result element to appear
  await page.waitForSelector('#docsearch-item-5 > a');

  // Extract the title text of the search result directly
  const titleText = await page.$eval('#docsearch-item-5 > a', el => el.textContent.trim());

  // Check if the extracted title matches the expected value
  if (titleText === "Experimental WebDriver BiDi support") {
    console.log("[V] Pass: Title matches expected value.");
  } else {
    console.error("[!] Title mismatch:");
    console.error(`    Expected: Experimental WebDriver BiDi support`);
    console.error(`    Actual:   ${titleText}`);
  }

  await browser.close();
})();
