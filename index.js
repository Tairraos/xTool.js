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
function getOwnFunctions(instance) {
    let proto = Object.getPrototypeOf(instance),
        props = Object.getOwnPropertyNames(proto),
        retObj = {};
    props.filter((item) => {
        let needExport = xUtil.is(instance[item], "function") && item !== "constructor";
        if (needExport) {
            retObj[item] = instance[item];
        }
        return needExport;
    });
    return retObj;
}

Object.assign(xTool, getOwnFunctions(xUtil));
Object.assign(xTool, getOwnFunctions(xFile));
Object.assign(xTool, getOwnFunctions(xNumber));
Object.assign(xTool, getOwnFunctions(xHtml));
Object.assign(xTool, getOwnFunctions(xBook));
Object.assign(xTool, getOwnFunctions(xNetwork));

module.exports = xTool;