let fs = require('fs'),
    path = require('path'),
    x = require('./index');


console.log(x.readDir(".", {
    find: "*.md"
}));

x.replaceFile("README.md", /xFile/g, "xtool");
x.replaceFile("README.md", /xUtil/g, "xtool");

x.readWebFile("http://localhost", "demo.html");
