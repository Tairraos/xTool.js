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
        return xUtil.distinctArray(xUtil.flattenArray(patten)).map((item) => {
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
     * @param {(object|string)} [setting] - optional, if only one find patten, can be simplify as a string
     * @param {boolean} [setting.absolute] - return absolute path or path relative from root. [default is false]
     * @param {boolean} [setting.recursive] - recursive to sub directory. [default is false]
     * @param {(string|regexp|array)} [setting.find] - provide human patten or human patten list to define filename matcher. [default is "*"]
     * @param {(string|regexp|array)} [setting.ignore] - provide human patten or human patten list to define which filename will be ignored. [default is none]
     * @return {array} list of file with absolute/relative path
     */
    readDir(root, setting) {
        setting = setting || {};
        if (xUtil.is(setting, "string")) setting = {
            find: setting
        };
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
                    }``
                });
            };
        recursive(rootPath);
        return xUtil.distinctArray(fileArray);
    }

    /**
     * Read file content
     * @param {string} file - path to file
     * @param {string} [encoding] - encoding
     * @return {string} if file not exist, will return empty string
     */
    readFile(file, encoding) {
        return this.existFile(file) ? fs.readFileSync(file, {
            encoding: encoding || "utf8"
        }) : "";
    }

    /**
     * Test file exist or not
     * @param {string} file - path to file
     * @return {boolean}
     */
    existFile(file) {
        return fs.existsSync(file);
    }

    /**
     * Test dir exist or not
     * @param {string} dir - path
     * @return {boolean}
     */
    existDir(dir) {
        return fs.existsSync(dir);
    }

    /**
     * Save content to file
     * @param {string} file - path to file
     * @param {(string|array|object)} content - file content, array will be join with {crlf}, object will be str
     * @param {string} [encoding] - encoding
     */
    saveFile(file, content, encoding) {
        if (xUtil.is(file, "string")) {
            content = xUtil.is(content, "array") ? xUtil.flattenArray(content).join("\n") :
                xUtil.is(content, "object") ? JSON.stringify(content) : content.toString();
            fs.writeFileSync(file, content, {
                encoding: encoding || "utf8"
            });
        }
    }

    /**
     * Alias of fs.unlinkSync
     * @param {string} file - path to file
     * @return {boolean} if file not exist, return false
     */
    removeFile(file) {
        return this.existFile(file) ? fs.unlinkSync(file) : false;
    }

    /**
     * scan file by line, and do callback to content of each line
     * @param {string} file - filename 
     * @param {function} callback - call back func(lineContent, lineNumber)
     */
    scanFile(file, callback) {
        if (xUtil.is(file, "string") && xUtil.is(callback, "function") && this.existFile(file)) {
            this.readFile(file).replace("\r").split("\n").forEach((line, i) => callback(line, i));
        }
    }

    /**
     * scan all file in list by line, and do callback to content of each line
     * @param {array} list - the file list from readDir() 
     * @param {function} callback - call back func(lineContent, lineNumber, fileName)
     */
    scanListFile(list, callback) {
        if (xUtil.is(list, "array") && xUtil.is(callback, "function")) {
            list.forEach((file) => {
                if (xUtil.is(file, "string") && this.existFile(file)) {
                    this.readFile(file).replace("\r").split("\n").forEach((line, i) => callback(line, i, file));
                }
            });
        }
    }

    /**
     * replace file content with patten & replacement
     * @param {string} file - path to file
     * @param {(string|regexp|function)} patten|callback -  
     * @param {string} [replacement] - if patten provided, replacement must provide, if patten is regexp, replacement can use the captured value by $1, $2, etc.
     */
    replaceFile(file, patten, replacement) {
        this.saveFile(file, this.readFile(file).replace(patten, replacement));
    }

};

module.exports = new xFile;