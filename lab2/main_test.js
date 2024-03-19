const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
// 模擬 fs.readFile 函式，讓它總是回傳預設內容
test.mock.method(fs, 'readFile', (file, options, callback) => {
  // 檔案讀取成功 (null 代表沒有錯誤)
  callback(null, 'alpha\nbeta\ngama');
});

// 引入待測試的程式 (./main.js)
const { Application, MailSystem } = require('./main');


