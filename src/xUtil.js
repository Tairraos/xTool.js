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
    flattenArray(arg) {
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
        return pattenArray;
    }

    /**
     * remove duplicated value of array
     * @param {array|*} arg - array to remopve duplicated value
     * @return {array} return an array with every unquie value
     */
    distinctArray(arg) {
        return this.is(arg, "array") ? [...new Set(arg)] : [arg];
    }

    /**
     * get node command args. 
     * @return {object} - command line: "node xxx.js -x1 y1 -x2 y2", will return {x1:"y1", x2:"y2"}
     */
    getArgs() {
        let argStr = process.argv.slice(2).map((i) => "{" + i + "}").join(""),
            argPatten = argStr.match(/\{-([a-z])\}{([^-}]+)}/g),
            args = {};

        while (argPatten && argPatten.length) {
            let [key, value] = argPatten.shift().match(/\{-([a-z])\}{([^-}]+)}/).slice(-2);
            args[key] = value;
        }
        return args;
    }
};

module.exports = new xUtil;
process.argv.push("-f");
process.argv.push("test");
module.exports.getArgs();