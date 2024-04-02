const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

//  MailSystem()
var fs = require('fs');
         fs.readFile("name_list.txt", "utf8", async function (err, data) {
             await fs.writeFile("name_list.txt", "\nsad\ndas\nasd\ndsa\nads\n", async function (err) {
                 console.log('寫入完成!');

                 await fs.readFile("name_list.txt", "utf8", async function (err, data) {
                     console.log('讀取完成！');
                     const c = new Application().getNames();
                     const d = new Application().notifySelected();
                     const e = new Application().getRandomPerson();
                     const f = new Application().selectNextPerson();
                     const g = new Application();
                     await g.getNames();
                     await g.selectNextPerson();
                     await g.selectNextPerson();
                     await g.notifySelected();
                     console.log(g.notifySelected())
                 });
             });
         });
// stub
const a = new MailSystem().write("a");
const b = new MailSystem().send("b");
//Mock
// Spy
