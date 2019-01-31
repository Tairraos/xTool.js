window.template = {};
window.$$logInfo = function (a, b, c) {
    template[a] = [b, c];
};

let logBuilder = {
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
                newLogId = logBuilder.getNextId(fileLogList);
                fileLogList[+newLogId] = [logText, logType];
                return fileId + newLogId;
            }
        }
        newFileId = logBuilder.getNextId(template, 3);
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