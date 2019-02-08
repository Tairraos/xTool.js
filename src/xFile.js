let fs = require('fs'),
    path = require('path'),
    xUtil = require('./xUtil');

/**
 * File relative tools of xTool
 */
class xFile {
    /**
     * Resolve patten, transfer wildcard patten to regexp format
     * @param {(string|regexp|array)} patten
     * @return {array} will return an array of patten
     */
    resolvePatten(patten) {
        return xUtil.flatArray(patten).map((item) => {
            switch (xUtil.typeof(item)) {
                case "number":
                    item = item.toString();
                case "string":
                    let isFile = !item.match(/\//),
                        basePatten = (isFile ? "^" : "") + item.replace(/\./g, "\\.").replace(/\*/g, ".+").replace(/\?/g, ".") + (isFile ? "$" : "");
                    return new RegExp(basePatten);
                case "regexp":
                    return item;
                default:
                    return /^$/;
            }
        });
    }

    /**
     * Test item, does this item match at least one patten of list.
     * @param {string} item - item of directory list, file or sub-directory
     * @param {array} pattenList - patten array
     * @param {boolean} [isDir] - optional
     * @return {boolean}
     */
    matcher(item, pattenList, isDir) {
        let matched = false,
            fileName = isDir ? "" : path.basename(item),
            filePath = isDir ? item + "/" : item;
        if (xUtil.typeof(pattenList) !== "array") {
            pattenList = this.resolvePatten(pattenList);
        }
        pattenList.forEach((patten) => {
            if (xUtil.typeof(patten) === "regexp") {
                matched = matched || patten.test(filePath) || patten.test(fileName);
            }
        });
        return matched;
    }

    /**
     * Get file list from a root path with configure
     * @param {string} root - file root path
     * @param {object} [setting] - optional
     * @param {boolean} [setting.absolute] - return absolute path or path relative from root. [default is false]
     * @param {boolean} [setting.recursive] - recursive to sub directory. [default is false]
     * @param {(string|regexp|array)} [setting.find] - provide human patten or human patten list to define filename matcher. [default is "*"]
     * @param {(string|regexp|array)} [setting.ignore] - provide human patten or human patten list to define which filename will be ignored. [default is none]
     */
    getFileList(root, setting) {
        setting = setting || {};
        let findPattenList = this.resolvePatten(setting.find || "*"),
            ignorePattenList = this.resolvePatten(setting.ignore || ""),
            absolute = !!setting.absolute,
            recursive = !!setting.recursive,
            fileArray = [],
            rootPath = (path.isAbsolute(root) ? root : path.join(process.cwd(), root)) + path.sep,
            recursivePath = (seekPath) => {
                let seekList = fs.readdirSync(seekPath);
                seekList.forEach((item) => {
                    var itemAbsolute = path.join(seekPath, item),
                        itemRelative = itemAbsolute.replace(rootPath, ""),
                        isDir = fs.statSync(itemAbsolute).isDirectory();
                    if (!this.matcher(itemRelative, ignorePattenList, isDir)) {
                        if (!isDir && this.matcher(itemRelative, findPattenList, isDir)) {
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

module.exports = new xFile();