let fs = require('fs'),
    path = require('path'),
    xUtil = require('./xUtil');

/**
 * File relative tools of xTool
 */
class xFile {
    /**
     * Resolve patten, transfer wildcard patten to regexp format
     * @private
     * @param {(string|regexp|array)} patten
     * @return {array} will return an array of patten
     */
    _resolvePatten(patten) {
        return xUtil.flatArray(patten).map((item) => {
            switch (xUtil.typeof(item)) {
                case "number":
                    item = item.toString();
                case "string":
                    let isFile = !item.match(/\//),
                        basePatten = (isFile ? "^" : "") + item.replace(/\./g, "\\.").replace(/\*/g, ".+").replace(/\?/g, ".") + (isFile ? "$" : "");
                    return item !== "" ? new RegExp(basePatten) : /$.^/;
                case "regexp":
                    return item;
                default:
                    return /$.^/;
            }
        });
    }

    /**
     * Test item, does this item match at least one patten of list.
     * @private
     * @param {string} item - item of directory list, file or sub-directory
     * @param {array} pattenList - patten array
     * @param {boolean} [isDir] - is this item is a directory
     * @return {boolean}
     */
    _pattenMatcher(item, pattenList, isDir) {
        let matched = false,
            fileName = isDir ? "" : path.basename(item),
            filePath = isDir ? item + "/" : item;
        if (!xUtil.is(pattenList, "array")) {
            pattenList = this._resolvePatten(pattenList);
        }
        pattenList.forEach((patten) => {
            if (xUtil.is(patten, "regexp")) {
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
     * @return {array} list of file with absolute/relative path
     */
    readDir(root, setting) {
        setting = setting || {};
        let findPattenList = this._resolvePatten(setting.find || "*"),
            ignorePattenList = this._resolvePatten(setting.ignore || ""),
            isAbsolute = !!setting.absolute,
            isRecursive = !!setting.recursive,
            fileArray = [],
            rootPath = (path.isAbsolute(root) ? root : path.join(process.cwd(), root)) + path.sep,
            recursive = (seekPath) => {
                let seekList = fs.readdirSync(seekPath);
                seekList.forEach((item) => {
                    var itemAbsolute = path.join(seekPath, item),
                        itemRelative = itemAbsolute.replace(rootPath, ""),
                        isDir = fs.statSync(itemAbsolute).isDirectory();
                    if (!this._pattenMatcher(itemRelative, ignorePattenList, isDir)) {
                        if (!isDir && this._pattenMatcher(itemRelative, findPattenList, isDir)) {
                            fileArray.push(isAbsolute ? itemAbsolute : itemRelative);
                        } else if (isDir && isRecursive) {
                            recursive(itemAbsolute);
                        }
                    }
                });
            };
        recursive(rootPath);
        return [...new Set(fileArray)];
    }

    /**
     * Read file content
     * @param {string} file - path to file
     * @param {string} [encoding] - encoding
     * @return {string}
     */
    readFile(file, encoding) {
        return fs.readFileSync(file, {
            encoding: encoding || "utf8"
        });
    }

    /**
     * Save content to file
     * @param {string} file - path to file
     * @param {string} content - file content
     * @param {string} [encoding] - encoding
     */
    saveFile(file, content, encoding) {
        fs.writeFileSync(file, content, {
            encoding: encoding || "utf8"
        });
    }
    /**
     * Alias of fs.existsSync
     * @param {string} file - path to file
     */
    existFile(file) {
        return fs.existsSync(file);
    }

    /**
     * Alias of fs.unlinkSync
     * @param {string} file - path to file
     * @return {boolean}
     */
    removeFile(file) {
        return fs.unlinkSync(file);
    }

    /**
     * replace file content with patten & replacement
     * @param {string} file - path to file
     * @param {*} patten 
     * @param {*} replacement 
     */
    replaceFile(file, patten, replacement) {
        this.saveFile(file, this.readFile(file).replace(patten, replacement));
    }

};

module.exports = new xFile;