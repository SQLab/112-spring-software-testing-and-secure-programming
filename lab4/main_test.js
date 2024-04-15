const puppeteer = require('puppeteer');

async function searchAndPrintTitle() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://pptr.dev/');

    // 点击搜索按钮
    const searchButtonSelector = '.DocSearch-Button';
    await page.waitForSelector(searchButtonSelector);
    await page.click(searchButtonSelector);

    // 输入搜索文字
    const searchInputSelector = '#docsearch-input';
    await page.waitForSelector(searchInputSelector);
    await page.type(searchInputSelector, 'chipi chipi chapa chapa');

    // 点击 Docs 區域的第一個結果
    const firstDocResultSelector = '#docsearch-item-5 > a';
    await page.waitForSelector(firstDocResultSelector);
    await page.click(firstDocResultSelector);

    // 获取页面标题
    const titleSelector = 'h1';
    await page.waitForSelector(titleSelector);
    const titleElement = await page.$(titleSelector);
    const titleText = await page.evaluate(el => el.textContent, titleElement);

    // 打印标题
    console.log(titleText);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    await browser.close();
  }
}

searchAndPrintTitle();
