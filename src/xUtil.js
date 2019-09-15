/**
 * Utility of xTool
 */
let xUtil = Object.assign(Function(), {
    /**
     * return the truly type of arg
     * @param {*} arg - any type arg
     * @return {string} type of arg
     */
    typeof (arg) {
        return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
    },

    /**
     * compare the value type with expect type
     * @param {*} value - value will be test
     * @param {string} type - expect type
     * @return {boolean}
     */
    is(value, type) {
        return xUtil.typeof(value) === type.toString().toLowerCase();
    },

    /**
     * recursive embeded array to a flat array, and will remove duplicated value
     * @param {(array|*)} arg - multi dimensions array, other type of arg will return a array warped arg
     * @return {array} return a one dimension array
     */
    flattenArray(arg) {
        let patternArray = [],
            recursive = (param) => {
                if (xUtil.typeof(param) === "array") {
                    param.forEach((subParam) =>
                        (xUtil.is(subParam, "array")) ? recursive(subParam) : patternArray.push(subParam));
                } else {
                    patternArray.push(param);
                }
            };
        recursive(arg);
        return patternArray;
    },

    /**
     * remove duplicated value of array
     * @param {array|*} arg - array to remopve duplicated value
     * @return {array} return an array with every unquie value
     */
    distinctArray(arg) {
        return xUtil.is(arg, "array") ? [...new Set(arg)] : [arg];
    },

    /**
     * get node command args
     * @return {object} - command line: "node xxx.js -a 111 -b=222 333 -d", will return 
     *     {
     *         0: ["-a", "111", "-b=222", "333", "-d"],
     *         1: "-a",
     *         2: "111",
     *         3: "-b=222",
     *         4: "333",
     *         5: "-d",
     *         "-a": "111",
     *         "-b": "222",
     *         "-d": true
     *     }
     */
    getArgs() {
        let argArr = [...process.argv.slice(2)],
            [args, index, item] = [{
                0: [...argArr]
            }, 1];

        while (item = argArr.shift()) {
            args[index++] = item;

            if (item.match(/^-/)) {
                if (item.match(/^(-\w+)="?(.*)"?$/)) {
                    args[RegExp.$1] = RegExp.$2;
                } else if (argArr.length && argArr[0].match(/^[^-]/)) {
                    args[item] = argArr[0];
                } else {
                    args[item] = true;
                }
            }
        }
        return args;
    },

    /**
     * generate values array of specified range, number range should be 0 to 2^32
     * @param {(number|string)} start - if "end" is not provided, the range is (0 or "0" or "a" or "A") to "start"
     * @param {(number|string)} [end]
     * @return {array}
     */
    range(start, end) {
        let type = xUtil.typeof(start),
            patt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            inNumLimit = n => n >= 0 && n <= 4294967296,
            numRange = (start, end) => Array(end - start + 1).fill().map((n, i) => i + start),
            letterRange = (start, end) => patt.slice(patt.indexOf(start), patt.indexOf(end) + 1).split("");

        if (type === "number" && inNumLimit(start))
            return numRange(end ? start : 0, end ? end : start);
        else if (type === "string" && inNumLimit(+start))
            return numRange(end ? +start : 0, end ? +end : +start).map(i => "" + i);
        else if (type === "string" && start.length)
            return letterRange(end ? start[0] : /[a-z]/.test(start[0]) ? "a" : "A", end ? end : start)
        return [];
    }

});

module.exports = xUtil;