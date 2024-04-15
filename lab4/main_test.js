const puppeteer = require('puppeteer');

(async () => {
  // 啟動瀏覽器並開啟新分頁
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 前往指定的網站
    await page.goto('https://pptr.dev/');

    // 找到並點擊搜尋按鈕
    const searchButton = await page.waitForSelector('.DocSearch-Button');
    await searchButton.click();

    // 輸入搜尋文字
    const searchInput = await page.waitForSelector('#docsearch-input');
    await searchInput.type('chipi chipi chapa chapa');

    // 等待搜尋結果出現
    await page.waitForSelector('#docsearch-item-5 > a');

    // 定位文件類別的搜尋結果區塊
    const docsResults = await page.$$('.DocSearch-Dropdown-Container > ul > li');

    // 找到第一個文件類別的搜尋結果並點擊
    for (const result of docsResults) {
      const category = await result.$eval('.DocSearch-Hit-category', el => el.textContent);
      if (category === 'Docs') {
        await result.click();
        break;
      }
    }

    // 等待頁面標題元素出現
    const titleElement = await page.waitForSelector('h1');

    // 取得頁面標題文字
    const titleText = await page.evaluate(el => el.textContent, titleElement);

    // 輸出頁面標題
    console.log(titleText);
  } catch (error) {
    console.error('搜尋過程中發生錯誤:', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
})();
