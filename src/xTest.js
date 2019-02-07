let fs = require('fs'),
    path = require('path'),
    xFile = require('./xFile');

console.log(xFile.getFileList("/Users/xiaole/Workspace", {
    recursive: true,
    absolute: 1,
    find: ["*.test.js"],
    ignore:["node_modules/", ".git/"]
}));