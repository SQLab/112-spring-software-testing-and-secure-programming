const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://pptr.dev/');

  // 設定螢幕大小
  await page.setViewport({width: 1080, height: 1024});

  // Step 1.點擊搜尋按鈕
  const searchButtonSelector = '.DocSearch-Button';
  await page.waitForSelector(searchButtonSelector);
  await page.click(searchButtonSelector);

  // Step 2.在搜尋框中輸入文字
  const searchInputSelector = '#docsearch-input';
  await page.waitForSelector(searchInputSelector);
  await page.type(searchInputSelector, 'chipi chipi chapa chapa');

  // Step 3.等待並點擊第一個搜尋結果
  await new Promise(r => setTimeout(r,1000))
  const searchResultSelector = '#docsearch-item-5 a';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Step 4.定位標題並獲取內容
  const titleSelector = 'h1';
  const titleElement = await page.waitForSelector(titleSelector);
  const element = await page.$(titleSelector);
  const title = await titleElement.evaluate(el => el.textContent);

  // Step 5.印出標題
  console.log(title);

  // Close the browser
  await browser.close();
})();
