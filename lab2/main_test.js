const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// Stub: Stub是一個假的相依物件，用來替換真正的相依物件
const mailSystemStub = {
  sendMail: () => {} // Stub了sendMail方法
};

// Mock: Mock是一個模擬的相依物件，用來驗證被測試程式的交互作用
const mailSystemMock = {
  sendMail: jest.fn() // 使用Jest的Mock函數來模擬sendMail方法
};

// Spy: Spy是一種監視函數的調用情況，用來驗證函數是否被正確調用
const mailSystemSpy = jest.spyOn(mailSystem, 'sendMail');

test('Application sends email when invoked', () => {
  const app = new Application(mailSystemStub); // 使用Stub來注入假的相依物件
  app.sendEmail(); // 觸發應用程式的發送郵件操作
  // 在這裡進行斷言，驗證是否正確調用了假的相依物件的sendMail方法
});

test('Application sends email when invoked - using mock', () => {
  const app = new Application(mailSystemMock); // 使用Mock來注入模擬的相依物件
  app.sendEmail(); // 觸發應用程式的發送郵件操作
  // 在這裡進行斷言，驗證是否正確調用了模擬的相依物件的sendMail方法
  expect(mailSystemMock.sendMail).toHaveBeenCalled(); // 驗證sendMail方法是否被呼叫
});

test('Application sends email when invoked - using spy', () => {
  const app = new Application(mailSystem); // 直接使用真實的相依物件
  app.sendEmail(); // 觸發應用程式的發送郵件操作
  // 在這裡進行斷言，驗證是否正確調用了真實的相依物件的sendMail方法
  expect(mailSystemSpy).toHaveBeenCalled(); // 使用Spy來驗證sendMail方法是否被呼叫
});
