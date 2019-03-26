let http = require("http"),
    fs = require("fs"),
    xUtil = require("./xUtil")

/**
 * Network relative tools of xTool
 */
let xNetwork = Object.assign(Function(), {

    /**
     * async download file from internet
     * @param {string} url 
     * @param {string} filename 
     * @param {function} callback 
     */
    downloadWebFile(url, filename, callback) {
        var file = fs.createWriteStream(filename);
        var request = http.get(url, function (response) {
            response.pipe(file);
            if (xUtil.is(callback, "function")) {
                file.on("finish", function () {
                    file.close(callback); // close() is async, call cb after close completes.
                });
            }
        }).on("error", function (err) { // Handle errors
            fs.unlink(filename); // Delete the file async. (But we don't check the result)
        });
    }
});

module.exports = xNetwork;