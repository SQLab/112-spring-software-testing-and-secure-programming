const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test('Application sends email when invoked', () => {
  // Stub: 使用 Stub 來模擬 MailSystem 的行為
  const mailSystemStub = {
    sendMail: jest.fn()
  };
  
  const app = new Application(mailSystemStub);
  app.sendEmail();

  // 驗證 sendMail 方法被調用
  expect(mailSystemStub.sendMail).toHaveBeenCalled();
});

test('Application does not send email when disabled', () => {
  // Mock: 使用 Mock 來模擬 MailSystem 的行為
  const mailSystemMock = {
    sendMail: jest.fn()
  };

  const app = new Application(mailSystemMock);
  app.disableEmail();
  app.sendEmail();

  // 驗證 sendMail 方法未被調用
  expect(mailSystemMock.sendMail).not.toHaveBeenCalled();
});

test('Application retries sending email on failure', () => {
  // Spy: 使用 Spy 來監視 MailSystem 的行為
  const mailSystemSpy = jest.spyOn(MailSystem.prototype, 'sendMail');

  const app = new Application(new MailSystem());
  app.sendEmail();

  // 模擬 sendMail 失敗
  mailSystemSpy.mockImplementationOnce(() => { throw new Error('Failed to send email'); });

  // 再次調用 sendEmail 方法，應該會進行重試
  app.sendEmail();

  // 驗證 sendMail 方法被調用了兩次
  expect(mailSystemSpy).toHaveBeenCalledTimes(2);
});
