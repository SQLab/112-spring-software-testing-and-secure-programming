const puppeteer = require('puppeteer');

async function getPageInfo() {
  // 啟動瀏覽器 (背景模式)
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // 前往指定網址
    await page.goto('https://pptr.dev/');

    // 等待標題元素載入
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector);

    // 取得標題元素
    const titleElement = await page.$(titleSelector);

    // 透過 evaluate 函式取得標題文字
    const titleText = await page.evaluate(el => el.textContent, titleElement);

    // 印出標題
    console.log(titleText);

    // 取得網頁 HTML 內容
    const htmlContent = await page.content();

    // 進行其他操作，例如解析 HTML 內容...

  } catch (error) {
    console.error('Error during processing:', error);
  } finally {
    // 關閉瀏覽器
    await browser.close();
  }
}

getPageInfo();
