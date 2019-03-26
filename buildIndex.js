let xFile = require('./src/xFile'),
    xUtil = require('./src/xUtil');

/**
 * list all function of class
 * @param {object} instance - class instance
 * @return {array}
 */
function getFuncList(name) {
    let instance = require('./src/' + name),
        funcList = Object.getOwnPropertyNames(instance);
    return funcList.filter((item) => xUtil.is(instance[item], "function") && !item.match(/^_/)).map((item) => `${item}: ${name}.${item}`);
}

let methodList = [
    ...getFuncList("xUtil"),
    ...getFuncList("xFile"),
    ...getFuncList("xNumber"),
    ...getFuncList("xHtml"),
    ...getFuncList("xNetwork")
].map((item) => "        " + item);

xFile.saveFile("index.js", [
    `let fs = require("fs"),`,
    `    xUtil = require("./src/xUtil"),`,
    `    xFile = require("./src/xFile"),`,
    `    xNumber = require("./src/xNumber"),`,
    `    xHtml = require("./src/xHtml"),`,
    `    xNetwork = require("./src/xNetwork"),`,
    `    xTool = {`,
    methodList.join(",\n"),
    `    };`,
    ``,
    `module.exports = xTool;`
].join("\n"));