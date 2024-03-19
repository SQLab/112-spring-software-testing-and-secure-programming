const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test.mock.method(fs, 'readFile', (file, options, callback) => 
  {
  callback(null, 'alpha\nbeta\ngama');
  }
                );

const { Application, MailSystem } = require('./main');
