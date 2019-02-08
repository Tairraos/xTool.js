let fs = require('fs'),
    path = require('path'),
    x = require('./index');

console.log(x.readDir(".", {
    find: ["*.test.js", "*.json"],
    ignore: ["node_modules/", ".git/"],
    recursive: true,
    absolute: false,
}));