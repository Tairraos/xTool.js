let fs = require('fs'),
    path = require('path'),
    xUtil = require('./xUtil');

let xFile = {
    /**
     * get file list from a root path
     * @param {string} root - file root path
     * @param {obj} setting
     *     relative: {boolean} return absolute path or path relative from root. [default is true]
     *     recursive: {boolean} recursive to sub directory. [default is false]
     *     find: {string|regexp|array} provide human patten or human patten list to define filename matcher. [default is "*"]
     *     ignore: {string|regexp|array} provide human patten or human patten list to define which filename will be ignored. [default is none]
     */
    getFileList: function (root, setting) {
        let findPatten = xFile.resolvePatten(setting.find || "*"),
            ignorePatten = xFile.resolvePatten(setting.ignore || "");

    },

    /**
     * test is filepath match every patten of patten list
     * @param {string} filepath 
     * @param {array} pattenList - patten array 
     * @return {boolean}
     */
    matcher: function (filepath, pattenList) {
        let matched = false;
        if (xUtil.typeof(pattenList) !== "array") {
            pattenList = xFile.resolvePatten(pattenList);
        }

        pattenList.forEach((patten) => {
            if (xUtil.typeof(patten) === "regexp") {
                matched = matched || patten.test(filepath);
            }
        });

        return matched;
    },

    /**
     * 
     * @param {string|regexp|array} patten
     * @return {array} will return an array of patten
     */
    resolvePatten: function (patten) {
        return xUtil.flatArray(patten).map((item) => {
            switch (xUtil.typeof(item)) {
                case "number":
                    item = item.toString();
                case "string":
                    if (item.substr(-1) === "/") {
                        return new RegExp(item.replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".?"));
                    } else {
                        return new RegExp("^" + item.replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".?") + "$");
                    }
                case "regexp":
                    return item;
                default:
                    return /^$/;
            }
        });
    },



    /**
     * get file list for a giving root path
     * @param {string} root - root path string
     * @return {array}
     */
    getDirFiles: function (root) {
        var nameList = fs.readdirSync(root),
            list = [];
        nameList.forEach(function (name) {
            var namePath = path.normalize(root + "/" + name),
                nameStat = fs.statSync(namePath);
            if (nameStat.isFile() && name.match(/^(.*)\.svg$/)) {
                list.push(RegExp.$1);
            }
        });
        return list.sort();
    },

    /**
     * get file list for a giving root path
     * @param {string} root - root path string
     * @param {array} target - the container array to save file list
     * @return {array}
     */
    getTreeFiles: function (root, target) {
        var nameList = fs.readdirSync(root);
        nameList.forEach(function (name) {
            var namePath = path.normalize(root + '/' + name),
                nameSave = namePath.replace(conf.fileRoot + '/', ''),
                nameStat = fs.statSync(namePath);
            if (!builder.inIgnoreList(nameSave)) {
                if (nameStat.isFile() && /\.js$/.test(nameSave)) {
                    target.push(nameSave);
                } else if (nameStat.isDirectory()) {
                    builder.getTreeFiles(namePath, target);
                }
            }
        });
    },

    /**
     *
     * @param {string} logText
     * @param {string} filePath
     * @param {string} logType - 'l' / 'i' / 'w' / 'e' / 'k'
     * @returns {string}
     */
    getLogId: function (logText, filePath, logType) {
        let fileId, fileLogId, newLogId, newFileId
        for (fileId in template) {
            if (template[fileId][0] === filePath) {
                let fileLogList = template[fileId][1];
                for (fileLogId in fileLogList) {
                    if (fileLogList[fileLogId][0] === logText && fileLogList[fileLogId][1] === logType) {
                        return fileId + fileLogId;
                    }
                }
                newLogId = leTool.getNextId(fileLogList);
                fileLogList[+newLogId] = [logText, logType];
                return fileId + newLogId;
            }
        }
        newFileId = leTool.getNextId(template, 3);
        template[newFileId] = [filePath, {
            1: [logText, logType]
        }];
        return newFileId + "1";
    },

    /**
     * @param {obj} keyList 
     * @param {number} length 
     */
    getNextId: function (keyList, length) {
        let id, maxId = 1;
        for (id in keyList) {
            maxId = maxId <= +id ? +id : maxId;
        }
        return length ? ("00000" + ++maxId).slice(-length) : (++maxId).toString();
    },

    /**
     * @returns {string}
     */
    template2file: function () {
        let fileTemplate = [];

        fileTemplate.push("(function (root) {");
        fileTemplate.push("    'use strict';");
        fileTemplate.push("    var I = root.$$logInfo;");
        fileTemplate.push("");

        let fileId, fileLogId, newLogId, newFileId
        for (fileId in template) {
            fileTemplate.push("");
            fileTemplate.push("    I(\"" + fileId + "\", \"" + template[fileId][0] + "\", {");
            let fileLogList = template[fileId][1];
            for (fileLogId in fileLogList) {
                fileTemplate.push("        " + fileLogId + ": [\"" + fileLogList[fileLogId][0] + "\", \"" + fileLogList[fileLogId][1] + "\"]");
            }
            fileTemplate.push("    });");
            fileTemplate.push("");
        }
        fileTemplate.push("}(typeof window === \"undefined\" ? global : window));");
        return fileTemplate.join("\n");
    },

    /**
     * 
     * @param logLine
     * @returns {string}
     */
    decodeLog: function (logLine) {
        return "";
    }

}

module.exports = xFile;

console.log(xFile.resolvePatten(["*.*", "*.*"]));