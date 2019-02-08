let xUtil = require('./src/xUtil'),
    xFile = require('./src/xFile');
module.exports = {
    typeof: xUtil.typeof,
    readDir: xFile.readDir,
    flatArray: xUtil.flatArray,
    _resolvePatten: xFile._resolvePatten,
    _pattenMatcher: xFile._pattenMatcher
};