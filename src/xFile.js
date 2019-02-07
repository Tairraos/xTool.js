let fs = require('fs'),
    path = require('path'),
    xUtil = require('./xUtil');

let xFile = {
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
                        return new RegExp(item.replace(/\./g, "\\.").replace(/\*/g, ".+").replace(/\?/g, "."));
                    } else {
                        return new RegExp("^" + item.replace(/\./g, "\\.").replace(/\*/g, ".+").replace(/\?/g, ".") + "$");
                    }
                case "regexp":
                    return item;
                default:
                    return /^$/;
            }
        });
    },

    /**
     * test is filepath match every patten of patten list
     * @param {string} filepath 
     * @param {array} pattenList - patten array 
     * @param {boolean} isDir [optional]
     * @return {boolean}
     */
    matcher: function (item, pattenList, isDir) {
        let matched = false,

            fileName = isDir ? "" : path.basename(item),
            filePath = isDir ? item + "/" : path.dirname(item) + "/";
        if (xUtil.typeof(pattenList) !== "array") {
            pattenList = xFile.resolvePatten(pattenList);
        }

        pattenList.forEach((patten) => {
            if (xUtil.typeof(patten) === "regexp") {
                matched = matched || patten.test(filePath) || patten.test(fileName);
            }
        });

        return matched;
    },

    /**
     * get file list from a root path
     * @param {string} root - file root path
     * @param {obj} setting [optional]
     *     absolute: {boolean} return absolute path or path relative from root. [default is false]
     *     recursive: {boolean} recursive to sub directory. [default is false]
     *     find: {string|regexp|array} provide human patten or human patten list to define filename matcher. [default is "*"]
     *     ignore: {string|regexp|array} provide human patten or human patten list to define which filename will be ignored. [default is none]
     */
    getFileList: function (root, setting) {
        setting = setting || {};
        let findPattenList = xFile.resolvePatten(setting.find || "*"),
            ignorePattenList = xFile.resolvePatten(setting.ignore || ""),
            absolute = !!setting.absolute,
            recursive = !!setting.recursive,
            fileArray = [],
            rootPath = path.normalize(root) + "/",
            rootList = fs.readdirSync(rootPath),
            recursivePath = (itemList) => {
                itemList.forEach((item) => {
                    var itemAbsolute = path.normalize(root + '/' + item),
                        itemRelative = itemAbsolute.replace(rootPath + '/', ''),
                        itemStat = fs.statSync(itemAbsolute);
                    if (!xFile.matcher(itemRelative, ignorePattenList)) {
                        if (itemStat.isFile() && !xFile.matcher(itemRelative, findPattenList)) {
                            fileArray.push(absolute ? itemAbsolute : itemRelative);
                        } else if (itemStat.isDirectory() && recursive) {
                            recursivePath(fs.readdirSync(itemAbsolute));
                        }
                    }
                });
            };
        recursivePath(rootList);
        return [...new Set(fileArray)];
    }
}

module.exports = xFile;