//at first, "npm i xtool.js" and require x in your code: 
//let x = require("xtool.js");
let x = require("./index"),
    args = x.getArgs();

//try to use node run your code and add some arguments
console.log(JSON.stringify(args));
//node xxx.js -a 111 -b=222 333 -d
// {
//     0: ["-a", "111", "-b=222", "333", "-d"],
//     1: "-a",
//     2: "111",
//     3: "-b=222",
//     4: "333",
//     5: "-d",
//     "-a": "111",
//     "-b": "222",
//     "-d": true
// }

//get all ".js, .css, .html" file in your directory
console.log(x.readDir(".", {
    find: ["*.js", "*.css", "*.html"]
}));
console.log(x.readDir(".", {
    find: ["*.js", "*.css", "*.html"],
    absolute: true, //get absolute path, default is false
    recursive: true, //get file list from sub folder, default is false
    ignore: ["node_modules/", "coverage/"]
}));

//type file
x.readFile("demo.js").split("\n").forEach(line => console.log(line));

//replace file content
x.replaceFile("README.md", /⇒/g, "=>");
