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
                    if (item.match(/\//)) {
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
            filePath = isDir ? item + "/" : item;
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
            rootPath = (path.isAbsolute(root) ? root : path.join(process.cwd(), root)) + path.sep,
            recursivePath = (seekPath) => {
                rootList = fs.readdirSync(seekPath),
                    rootList.forEach((item) => {
                        var itemAbsolute = path.join(seekPath, item),
                            itemRelative = itemAbsolute.replace(rootPath, ""),
                            itemStat = fs.statSync(itemAbsolute),
                            isDir = itemStat.isDirectory();
                        if (!xFile.matcher(itemRelative, ignorePattenList, isDir)) {
                            if (itemStat.isFile() && xFile.matcher(itemRelative, findPattenList, isDir)) {
                                fileArray.push(absolute ? itemAbsolute : itemRelative);
                            } else if (isDir && recursive) {
                                recursivePath(itemAbsolute);
                            }
                        }
                    });
            };

        recursivePath(rootPath);
        return [...new Set(fileArray)];
    }
};

module.exports = xFile;