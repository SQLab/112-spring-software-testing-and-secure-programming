const puppeteer = require('puppeteer');

(async () => {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // 前往指定的網址
  await page.goto('https://pptr.dev/');

  // 1. 點擊搜尋按鈕 (使用 XPath)
  const searchButtonXPath = '//button[contains(@class, "DocSearch-Button")]';
  await page.waitForXPath(searchButtonXPath);
  const [searchButton] = await page.$x(searchButtonXPath);
  await searchButton.click();

  // 2. 輸入搜尋文字
  const searchInputSelector = '#docsearch-input'; 
  await page.waitForSelector(searchInputSelector); 
  await page.type(searchInputSelector, 'chipi chipi chapa chapa'); 

  // 3. 等待搜尋結果並點擊 Docs 區段的第一個結果
  const firstDocResultXPath = '//*[@id="docsearch-item-5"]/a';
  await page.waitForXPath(firstDocResultXPath);
  const [firstDocResult] = await page.$x(firstDocResultXPath);
  await firstDocResult.click();

  // 4. 取得頁面標題 (使用 XPath)
  const titleXPath = '//h1';
  await page.waitForXPath(titleXPath);
  const [titleElement] = await page.$x(titleXPath);
  const titleText = await page.evaluate(el => el.textContent, titleElement);

  // 5. 印出標題
  console.log(titleText);

  // 關閉瀏覽器
  await browser.close();
})();
