let fs = require('fs'),
    path = require('path'),
    x = require('./index');


console.log(x.readDir("./src", {
    find: "*.js",
    recursive: true
}));
// console.log(x.readDir(".", {
//     find: ["*.test.js", "*.json"],
//     ignore: ["node_modules/", ""],
//     recursive: true,
//     absolute: false,
// }));