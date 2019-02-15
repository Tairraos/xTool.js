let fs = require('fs'),
    xUtil = require('./src/xUtil'),
    xFile = require('./src/xFile');
module.exports = {
    _resolvePatten: xFile._resolvePatten,
    _pattenMatcher: xFile._pattenMatcher,
    typeof: xUtil.typeof,
    is: xUtil.is,
    flatArray: xUtil.flatArray,
    readDir: xFile.readDir,
    readFile: xFile.readFile,
    saveFile: xFile.saveFile,
    existFile: xFile.existFile,
    removeFile: xFile.removeFile,
    replaceFile: xFile.replaceFile,
    scanFile: xFile.scanFile,
    scanListFile: xFile.scanListFile
};