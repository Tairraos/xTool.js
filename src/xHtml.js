/**
 * HTML relative tools of xTool
 */
let xHtml = Object.assign(Function(), {
    /**
     * transfer &#DDDD; & &#xHHHH; it was. make sure the html page under utf-8;
     * @param {string} htmlContent - included  
     * @return {string} 
     */
    decodeHtml(htmlContent) {
        return htmlContent.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        }).replace(/&#x([A-Fa-f\d]+);/g, function (match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        });
    }
});

module.exports = xHtml;