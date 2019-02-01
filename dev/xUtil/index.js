module.exports = xUtil = {
    /**
     * return the truly type of arg
     * @param {any} arg 
     */
    typeof: function (arg) {
        return Object.prototype.toString.call(arg).slice(8, -1);
    }
};