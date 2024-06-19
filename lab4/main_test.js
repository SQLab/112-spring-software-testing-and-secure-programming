const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    // 跟 Selenium 剛好顛倒，預設是無頭模式
    // browser = await puppeteer.launch({ headless: false });
    
    // AutoGrading
    browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('https://pptr.dev/');
    await new Promise(resolve => setTimeout(resolve, 3000)); // 等待3秒

    // 點擊搜尋按鈕
    await page.click('button.DocSearch.DocSearch-Button');
    await new Promise(resolve => setTimeout(resolve, 3000)); // 等待3秒

    // 輸入搜尋內容
    await page.type('.DocSearch-Input', 'chipi chipi chapa chapa');
    await new Promise(resolve => setTimeout(resolve, 3000)); // 等待3秒

    // 找到 URL
    const href = await page.evaluate(() => {
      // 找到包含文本 'Docs' 的 div 的 section 元素
      const docsSection = Array.from(document.querySelectorAll('section.DocSearch-Hits'))
        .find(section => section.querySelector('div.DocSearch-Hit-source').innerText === 'Docs');
      // 在找到的 section 中找到第一個 li 元素，return 第一個 a 標籤的 href
      const firstLi = docsSection ? docsSection.querySelector('ul li.DocSearch-Hit a') : null;
      return firstLi ? firstLi.href : null;
    });

    if (href) {
      // 前往找到的 URL
      await page.goto(href);
      // 等待頁面載入完成
      await page.waitForSelector('.theme-doc-markdown');

      // print <div class="theme-doc-markdown markdown"> 下 <h1> 標籤的文本
      const headerText = await page.evaluate(() => {
        const header = document.querySelector('.theme-doc-markdown.markdown h1');
        return header ? header.innerText : null;
      });

      if (headerText) {
        console.log(headerText);
      } else {
        console.log('沒有找到 h1 標籤');
      }
    } else {
      console.log('沒有找到匹配的 URL');
    }

  } catch (error) {
    console.error('發生錯誤:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
