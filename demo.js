let fs = require('fs'),
    path = require('path'),
    x = require('./index'),
    args = x.getArgs();

// console.log(x.readDir(".", {
//     find: "*.md"
// }));

x.replaceFile("README.md", /xFile/g, "xtool");
x.replaceFile("README.md", /xUtil/g, "xtool");
x.replaceFile("README.md", /xHtml/g, "xtool");
x.replaceFile("README.md", /xNetwork/g, "xtool");
x.replaceFile("README.md", /xBook/g, "xtool");
x.replaceFile("README.md", /xNumber/g, "xtool");

// x.downloadWebFile("http://localhost", "demo.html");

console.log(args);