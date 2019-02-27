let fs = require('fs'),
    xUtil = require('./src/xUtil'),
    xFile = require('./src/xFile'),
    xNumber = require('./src/xNumber'),
    xHtml = require('./src/xHtml'),
    xBook = require('./src/xBook'),
    xNetwork = require('./src/xNetwork'),
    xTool = {};

/**
 * list all function of class
 * @param {object} instance - class instance
 * @return {array}
 */
function genInstanceRefStr(instance) {
    let proto = Object.getPrototypeOf(instance),
        funcList = Object.getOwnPropertyNames(proto),
        className = instance.constructor.name;
    return funcList.filter((item) => xUtil.is(instance[item], "function") && item !== "constructor").map((item) => `${item}: ${className}.${item}`);
}

let methodList = [
    ...genInstanceRefStr(xUtil),
    ...genInstanceRefStr(xFile),
    ...genInstanceRefStr(xNumber),
    ...genInstanceRefStr(xHtml),
    ...genInstanceRefStr(xBook),
    ...genInstanceRefStr(xNetwork)
].map((item) => "        " + item);

xFile.saveFile("index.js", [
    `let fs = require("fs"),`,
    `    xUtil = require("./src/xUtil"),`,
    `    xFile = require("./src/xFile"),`,
    `    xNumber = require("./src/xNumber"),`,
    `    xHtml = require("./src/xHtml"),`,
    `    xBook = require("./src/xBook"),`,
    `    xNetwork = require("./src/xNetwork"),`,
    `    xTool = {`,
    methodList.join(",\n"),
    `    };`,
    ``,
    `module.exports = xTool;`
].join("\n"));