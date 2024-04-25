const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://pptr.dev/');
    
    // Hints:
    // Click search button
    await page.click('button.DocSearch.DocSearch-Button'); 
    
    // Type into search box
    // Wait for search result
    await page.waitForSelector('#docsearch-input.DocSearch-Input');
    await page.type('#docsearch-input.DocSearch-Input', 'chipi chipi chapa chapa',{delay: 2000}); 

    
    // Get the `Docs` result section
    await page.waitForSelector('#docsearch-item-5.DocSearch-Hit'); 
    // Click on first result in `Docs` section
    await page.click('#docsearch-item-5.DocSearch-Hit');
    
    // Locate the title
    let titletext = await page.waitForSelector('#__docusaurus_skipToContent_fallback > div > div > main > div > div > div > div > article > div.theme-doc-markdown.markdown > h1'); 
    let flag = await titletext.evaluate(element=> element.textContent);
    
    // Print the title
    console.log(flag); 
    
    // Close the browser
    await browser.close();
})();
