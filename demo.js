//in your code: x = require("xTool.js")
let x = require("./index"), 
    args = x.getArgs();

//try to use node run your code and add some arguments
console.log(JSON.stringify(args));
//node code.js -f aa -d=123
// if (args["-f"]==="test1")


// // console.log(x.readDir(".", {
// //     find: "*.md"
// // }));

// x.replaceFile("README.md", /xFile/g, "xtool");
// x.replaceFile("README.md", /xUtil/g, "xtool");
// x.replaceFile("README.md", /xHtml/g, "xtool");
// x.replaceFile("README.md", /xNetwork/g, "xtool");
// x.replaceFile("README.md", /xBook/g, "xtool");
// x.replaceFile("README.md", /xNumber/g, "xtool");

// // x.downloadWebFile("http://localhost", "demo.html");

// console.log(args);