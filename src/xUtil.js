let xUtil = {
    /**
     * return the truly type of arg
     * @param {any} arg 
     */
    typeof: function (arg) {
        return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
    },

    /**
     * recursive embeded array to a flat array, and will remove duplicated value
     * @param {array|any} item 
     */
    flatArray: function (arg) {
        let pattenArray = [],
            recursiveArray = (param) => {
                if (xUtil.typeof(param) === "array") {
                    param.forEach((subParam) =>
                        (xUtil.typeof(subParam) === "array") ? recursiveArray(subParam) : pattenArray.push(subParam));
                } else {
                    pattenArray.push(param);
                }
            };
        recursiveArray(arg);
        return [...new Set(pattenArray)];
    }
};

module.exports = xUtil;