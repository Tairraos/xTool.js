/**
 * Utility of xTool
 */
class xUtil {
    /**
     * return the truly type of arg
     * @param {*} arg - any type arg
     * @return {string} type of arg
     */
    typeof (arg) {
        return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
    }

    /**
     * compare the value type with expect type
     * @param {*} value - value will be test
     * @param {*} type - expect type
     * @return {boolean}
     */
    is(value, type) {
        return this.typeof(value) === type.toString().toLowerCase();
    }

    /**
     * recursive embeded array to a flat array, and will remove duplicated value
     * @param {(array|*)} arg - multi dimensions array, other type of arg will return a array warped arg
     * @return {array} return a one dimension array 
     */
    flatArray(arg) {
        let pattenArray = [],
            recursive = (param) => {
                if (this.typeof(param) === "array") {
                    param.forEach((subParam) =>
                        (this.is(subParam, "array")) ? recursive(subParam) : pattenArray.push(subParam));
                } else {
                    pattenArray.push(param);
                }
            };
        recursive(arg);
        return [...new Set(pattenArray)];
    }
};

module.exports = new xUtil;