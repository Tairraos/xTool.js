let xFile = require('./xFile');

console.log(xFile.getFileList("../",{
    absolute:true,
    recursive:true,
    find:"*.*",
    ignore: []
}))