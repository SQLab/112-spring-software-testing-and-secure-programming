const puppeteer = require('puppeteer');

(async () => {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // 前往指定的網址
  await page.goto('https://pptr.dev/');

  // 1. 點擊搜尋按鈕
  const searchButtonSelector = '.DocSearch-Button'; // 選擇器定位搜尋按鈕
  await page.waitForSelector(searchButtonSelector); // 等待搜尋按鈕出現
  await page.click(searchButtonSelector); // 點擊搜尋按鈕

  // 2. 輸入搜尋文字
  const searchInputSelector = '#docsearch-input'; // 選擇器定位搜尋輸入框
  await page.waitForSelector(searchInputSelector); // 等待搜尋輸入框出現
  await page.type(searchInputSelector, 'chipi chipi chapa chapa'); // 輸入搜尋文字

  // 3. 等待搜尋結果並點擊 Docs 區段的第一個結果
  const firstDocResultSelector = '#docsearch-item-5 > a'; // 選擇器定位 Docs 區段第一個結果
  await page.waitForSelector(firstDocResultSelector); // 等待 Docs 區段第一個結果出現
  await page.click(firstDocResultSelector); // 點擊 Docs 區段第一個結果

  // 4. 取得頁面標題
  const titleSelector = 'h1'; // 選擇器定位標題元素
  await page.waitForSelector(titleSelector); // 等待標題元素出現
  const titleElement = await page.$(titleSelector); // 取得標題元素
  const titleText = await page.evaluate(el => el.textContent, titleElement); // 取得標題文字

  // 5. 印出標題
  console.log(titleText);

  // 關閉瀏覽器
  await browser.close();
})();
