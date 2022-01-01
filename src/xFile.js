let fs = require('fs'),
    path = require('path'),
    xUtil = require('./xUtil');

/**
 * File relative tools of xTool
 */
let xFile = Object.assign(Function(), {
    /**
     * Resolve pattern, transfer wildcard pattern to regexp format
     * @private
     * @param {(string|regexp|array)} pattern
     * @return {array} will return an array of pattern
     */
    _resolvePattern(pattern) {
        return xUtil.distinctArray(xUtil.flattenArray(pattern)).map((item) => {
            switch (xUtil.typeof(item)) {
                case "number":
                    item = item.toString();
                case "string":
                    let isFile = !item.match(/\//),
                        basePattern = (isFile ? "^" : "") + item.replace(/\./g, "\\.").replace(/\*/g, ".+").replace(/\?/g, ".") + (isFile ?
                            "$" : "");
                    return item !== "" ? RegExp(basePattern) : /$.^/;
                case "regexp":
                    return item;
                default:
                    return /$.^/;
            }
        });
    },

    /**
     * Test item, does the item match at least one pattern of list.
     * @private
     * @param {string} item - item of directory list, file or sub-directory
     * @param {array} patternList - pattern array
     * @param {boolean} [isDir] - is the item is a directory
     * @return {boolean}
     */
    _patternMatcher(item, patternList, isDir) {
        let matched = false,
            fileName = isDir ? "" : path.basename(item),
            filePath = isDir ? item + "/" : item;
        if (!xUtil.is(patternList, "array")) {
            patternList = xFile._resolvePattern(patternList);
        }
        patternList.forEach((pattern) => {
            if (xUtil.is(pattern, "regexp")) {
                matched = matched || pattern.test(filePath) || pattern.test(fileName);
            }
        });
        return matched;
    },

    /**
     * Prepare directory, will create the full path if not exist
     * @param {string} dir 
     */
    prepareDir(dir) {
        if (xFile.existDir(dir)) {
            return;
        }
        if (!xFile.existDir(path.dirname(dir))) {
            xFile.prepareDir(path.dirname(dir))
        };
        fs.mkdirSync(dir);
    },

    /**
     * Get file list from a root path with configure
     * @param {string} root - file root path
     * @param {(object|string)} [setting] - optional, if only one find pattern, can be simplify as a string
     * @param {boolean} [setting.absolute] - return absolute path or path relative from root. [default is false]
     * @param {boolean} [setting.recursive] - recursive to sub directory. [default is false]
     * @param {(string|regexp|array)} [setting.find] - provide human pattern or human pattern list to define filename matcher. [default is "*"]
     * @param {(string|regexp|array)} [setting.ignore] - provide human pattern or human pattern list to define which filename will be ignored. [default is none]
     * @return {array} list of file with absolute/relative path
     */
    readDir(root, setting) {
        root = root || ".";
        setting = setting || {};
        if (xUtil.is(setting, "string")) setting = {
            find: setting
        };
        let findPatternList = xFile._resolvePattern(setting.find || "*"),
            ignorePatternList = xFile._resolvePattern(setting.ignore || ""),
            isAbsolute = !!setting.absolute,
            isRecursive = !!setting.recursive,
            fileArray = [],
            tempPath = path.isAbsolute(root) ? root : path.join(process.cwd(), path.normalize(root)),
            rootPath = path.dirname(tempPath) + path.sep + path.basename(tempPath) + path.sep,
            recursive = (seekPath) => {
                let seekList = fs.readdirSync(seekPath);
                seekList.forEach((item) => {
                    var itemAbsolute = path.join(seekPath, item),
                        itemRelative = itemAbsolute.replace(rootPath, ""),
                        isDir = fs.statSync(itemAbsolute).isDirectory();
                    if (!xFile._patternMatcher(itemRelative, ignorePatternList, isDir)) {
                        if (!isDir && xFile._patternMatcher(itemRelative, findPatternList, isDir)) {
                            fileArray.push(isAbsolute ? itemAbsolute : itemRelative);
                        } else if (isDir && isRecursive) {
                            recursive(itemAbsolute);
                        }
                    }
                });
            };
        recursive(rootPath);

        return xUtil.distinctArray(fileArray);
    },

    /**
     * Read file content
     * @param {string} file - path to file
     * @param {string} [encoding] - encoding
     * @return {string} if file not exist, will return empty string
     */
    readFile(file, encoding) {
        return xFile.existFile(file) ? fs.readFileSync(file, {
            encoding: encoding || "utf8"
        }) : "";
    },

    /**
     * Test file exist or not
     * @param {string} file - path to file
     * @return {boolean}
     */
    existFile(file) {
        return fs.existsSync(file) && fs.statSync(file).isFile();
    },

    /**
     * Test dir exist or not
     * @param {string} dir - path
     * @return {boolean}
     */
    existDir(dir) {
        return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
    },

    /**
     * Save content to file
     * @param {string} file - path to file
     * @param {(string|array|object)} content - file content, array will be join with {crlf}, object will be str
     * @param {string} [encoding] - encoding
     */
    saveFile(file, content, encoding) {
        if (xUtil.is(file, "string")) {
            xFile.prepareDir(path.dirname(file));
            content = xUtil.is(content, "array") ? xUtil.flattenArray(content).join("\n") :
                xUtil.is(content, "object") ? JSON.stringify(content) : content.toString();
            fs.writeFileSync(file, content, {
                encoding: encoding || "utf8"
            });
        }
    },

    /**
     * Alias of fs.unlinkSync
     * @param {string} file - path to file
     * @return {boolean} if file not exist, return false
     */
    removeFile(file) {
        return xFile.existFile(file) ? fs.unlinkSync(file) : false;
    },

    /**
     * scan file by line, and do callback to content of each line
     * @param {string} file - filename 
     * @param {function} callback - call back func(lineContent, lineNumber)
     */
    scanFile(file, callback) {
        if (xUtil.is(file, "string") && xUtil.is(callback, "function") && xFile.existFile(file)) {
            xFile.readFile(file).replace("\r").split("\n").forEach((line, i) => callback(line, i));
        }
    },

    /**
     * scan all file in list by line, and do callback to content of each line
     * @param {array} list - the file list from readDir() 
     * @param {function} callback - call back func(lineContent, lineNumber, fileName)
     */
    scanListFile(list, callback) {
        if (xUtil.is(list, "array") && xUtil.is(callback, "function")) {
            list.forEach((file) => {
                if (xUtil.is(file, "string") && xFile.existFile(file)) {
                    xFile.readFile(file).replace("\r").split("\n").forEach((line, i) => callback(line, i, file));
                }
            });
        }
    },

    /**
     * replace file content with pattern & replacement
     * @param {string} file - path to file
     * @param {(string|regexp|function)} pattern|callback -  
     * @param {string} [replacement] - if pattern provided, replacement must provide, if pattern is regexp, replacement can use the captured value by $1, $2, etc.
     */
    replaceFile(file, pattern, replacement) {
        xFile.saveFile(file, xFile.readFile(file).replace(pattern, replacement));
    }

});

module.exports = xFile;
