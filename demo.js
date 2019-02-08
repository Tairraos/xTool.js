let fs = require('fs'),
    path = require('path'),
    xFile = require('./src/xFile');

console.log(xFile.readDir(".", {
    find: ["*.test.js", "*.json"],
    ignore: ["node_modules/", ".git/"],
    recursive: true,
    absolute: false,
}));