const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // 前往 https://pptr.dev/
    await page.goto('https://pptr.dev/');

    // 等待搜索框元素可見
    await page.waitForSelector('#search input');

    // 在搜索框中輸入文字
    await page.type('#search input', 'chipi chipi chapa chapa');

    // 點擊搜索按鈕
    await page.click('#search-button');

    // 等待搜索結果加載完成
    await page.waitForSelector('.search-results');

    // 點擊所有搜索結果中的第五個連結
    const searchResults = await page.$$('.search-results .doc');
    for (const result of searchResults) {
      const fifthResult = await result.$$('a')[4];
      if (fifthResult) {
        await fifthResult.click();
        // 等待新頁面加載完成
        await page.waitForNavigation();
        // 獲取並打印標題
        const title = await page.title();
        console.log(title);
        // 返回搜索結果頁面
        await page.goBack();
        // 等待搜索結果加載完成
        await page.waitForSelector('.search-results');
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
})();