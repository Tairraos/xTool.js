let xUtil = require('./src/xUtil'),
    xFile = require('./src/xFile');
module.exports = {
    typeof: xUtil.typeof,
    is: xUtil.is,
    flatArray: xUtil.flatArray,
    readDir: xFile.readDir,
    readFile: xFile.readFile,
    saveFile: xFile.saveFile,
    _resolvePatten: xFile._resolvePatten,
    _pattenMatcher: xFile._pattenMatcher
};