const xUtil = require('../src/xUtil');

describe('test xUtil.typeof', () => {
    it("test number", () => {
        expect(xUtil.typeof(1)).toBe("number");
        expect(xUtil.typeof(NaN)).toBe("number");
        expect(xUtil.typeof(Infinity)).toBe("number");
    });

    it("test string", () => {
        expect(xUtil.typeof("")).toBe("string");
        expect(xUtil.typeof("true")).toBe("string");
        expect(xUtil.typeof([].toString())).toBe("string");
    });

    it("test regexp", () => {
        expect(xUtil.typeof(/test/)).toBe("regexp");
        expect(xUtil.typeof(RegExp())).toBe("regexp");
    });

    it("test boolean", () => {
        expect(xUtil.typeof(true)).toBe("boolean");
        expect(xUtil.typeof(false)).toBe("boolean");
        expect(xUtil.typeof(!0)).toBe("boolean");
    });

    it("test array", () => {
        expect(xUtil.typeof([])).toBe("array");
        expect(xUtil.typeof("test".split())).toBe("array");
    });

    it("test object", () => {
        expect(xUtil.typeof({})).toBe("object");
        expect(xUtil.typeof(new Object)).toBe("object");
    });

    it("test undefined", () => {
        expect(xUtil.typeof()).toBe("undefined");
        expect(xUtil.typeof(undefined)).toBe("undefined");
    });

    it("test null", () => {
        expect(xUtil.typeof(null)).toBe("null");
    });

    it("test function", () => {
        expect(xUtil.typeof(function () {})).toBe("function");
    });

    it("test class", () => {
        expect(xUtil.typeof(new Date)).toBe("date");
    });
});

describe('test xUtil.typeof', () => {
    it("test number", () => {
        expect(xUtil.is(1, "number")).toBeTruthy();
        expect(xUtil.is({}, "number")).toBeFalsy();
    });
    //Just test one type is enough, other case is by xUtil.typeof
});

describe('test xUtil.flattenArray', () => {
    it("trans value to array", () => {
        expect(xUtil.flattenArray(1)).toEqual([1]);
    });

    it("keep simple array as flat array", () => {
        expect(xUtil.flattenArray([1])).toEqual([1]);
    });

    it("flat embeded array to flat array", () => {
        expect(xUtil.flattenArray([1, 2])).toEqual([1, 2]);
        expect(xUtil.flattenArray([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
        expect(xUtil.flattenArray([1, [2, [3, 4], 5], 6])).toEqual([1, 2, 3, 4, 5, 6]);
        expect(xUtil.flattenArray([1, [2, [3, [4, 5], 6], 7], 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("remove duplicated value from every level", () => {
        expect(xUtil.flattenArray([1, [2, 3], 3, 4])).toEqual([1, 2, 3, 3, 4]);
        expect(xUtil.flattenArray([1, [2, [3, 4, 5], 5], 6])).toEqual([1, 2, 3, 4, 5, 5, 6]);
        expect(xUtil.flattenArray([1, [2, [3, [4, 5], 6], 7], 5, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 5, 8]);
    });
});

describe('test xUtil.distinctArray', () => {
    it("remove duplicated value from every level", () => {
        expect(xUtil.distinctArray(1)).toEqual([1]);
        expect(xUtil.distinctArray([1, 1])).toEqual([1]);
        expect(xUtil.distinctArray([1, 2])).toEqual([1, 2]);
        expect(xUtil.distinctArray([1, 2, 2])).toEqual([1, 2]);
    });
});

describe('test xUtil.getArgs', () => {
    it("test number", () => {
        process.argv.splice(2);
        expect(xUtil.getArgs()).toEqual({});
        process.argv.push("-a", "test");
        expect(xUtil.getArgs()).toEqual({
            "-a": "test"
        });
        process.argv.push("test2");
        expect(xUtil.getArgs()).toEqual({
            "-a": "test",
            "1": "test2"
        });
        process.argv.push("-b", "-c", "test3", "test4");
        expect(xUtil.getArgs()).toEqual({
            "-a": "test",
            "1": "test2",
            "-b": true,
            "-c": "test3",
            "2": "test4"
        });
    });
});

describe('test xUtil.range', () => {
    it("test number", () => {
        //字母
        expect(xUtil.range("d")).toEqual(["a", "b", "c", "d"]);
        expect(xUtil.range("b", "d")).toEqual(["b", "c", "d"]);
        expect(xUtil.range("D")).toEqual(["A", "B", "C", "D"]);
        expect(xUtil.range("B", "D")).toEqual(["B", "C", "D"]);

        expect(xUtil.range(5)).toEqual([0, 1, 2, 3, 4, 5]);
        expect(xUtil.range(2, 5)).toEqual([2, 3, 4, 5]);
        //start类型优先
        expect(xUtil.range(2, "5")).toEqual([2, 3, 4, 5]);
        expect(xUtil.range("2", 5)).toEqual(["2", "3", "4", "5"]);
        //字符型数字
        expect(xUtil.range("5")).toEqual(["0", "1", "2", "3", "4", "5"]);
        expect(xUtil.range("2", "5")).toEqual(["2", "3", "4", "5"]);
        //字母
        expect(xUtil.range("d")).toEqual(["a", "b", "c", "d"]);
        expect(xUtil.range("b", "d")).toEqual(["b", "c", "d"]);
        expect(xUtil.range("D")).toEqual(["A", "B", "C", "D"]);
        expect(xUtil.range("B", "D")).toEqual(["B", "C", "D"]);
        expect(xUtil.range([1], [5])).toEqual([]);
    });
});