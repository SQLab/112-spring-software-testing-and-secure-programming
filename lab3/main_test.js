const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
const calculator =new  Calculator();
console.log(calculator.exp(87));
console.log(calculator.log(48763));

const a = new Calculator();

console.log(a.exp(0xFF));
console.log(a.log(0Xff));
console.log("hex TEST");

console.log(a.exp(-0));
console.log(a.log(1));
console.log("zero test");

console.log(a.exp(0.1));
console.log(a.log(0.1));
console.log("0.1 text");
try{
    console.log(a.log(1/((a.exp(9999)))));
    console.log(a.exp(1/((a.exp(9999)))));
}catch (e){}
try{
    console.log(a.log(1/0));
    console.log(a.exp(1/0));
}catch (e){}
try{
    console.log(a.log(0));
    console.log(a.exp(0));
}catch (e){}
try {
    console.log(a.exp(""));
    console.log(a.log(""));
}catch (e){}
try {
    console.log(a.log(a.log(a.log(a.log(a.log(a.log(a.log(9999999999999999))))))));
    console.log(a.exp(a.exp(a.exp(a.exp(a.exp(a.exp(a.exp(9999999999999))))))));
}catch (e){
    console.log("muliti input")
}
try{
    console.log(a.exp(NULL));
    console.log(a.log(NULL));
}catch (e){
    console.log("NULL TEST");
}
