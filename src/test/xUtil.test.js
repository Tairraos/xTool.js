const xUtil = require('../xUtil');

it('test xUtil.typeof', () => {
    //test number
    expect(xUtil.typeof(1)).toBe("number");
    expect(xUtil.typeof(NaN)).toBe("number");
    expect(xUtil.typeof(Infinity)).toBe("number");

    //test string
    expect(xUtil.typeof("")).toBe("string");
    expect(xUtil.typeof("true")).toBe("string");
    expect(xUtil.typeof([].toString())).toBe("string");

    //test regexp
    expect(xUtil.typeof(/test/)).toBe("regexp");
    expect(xUtil.typeof(new RegExp())).toBe("regexp");

    //test boolean
    expect(xUtil.typeof(true)).toBe("boolean");
    expect(xUtil.typeof(false)).toBe("boolean");
    expect(xUtil.typeof(!0)).toBe("boolean");

    //test array
    expect(xUtil.typeof([])).toBe("array");
    expect(xUtil.typeof("test".split())).toBe("array");

    //test object
    expect(xUtil.typeof({})).toBe("object");
    expect(xUtil.typeof(new Object)).toBe("object");

    //test undefined
    expect(xUtil.typeof()).toBe("undefined");
    expect(xUtil.typeof(undefined)).toBe("undefined");

    //test null
    expect(xUtil.typeof(null)).toBe("null");
    //test function
    expect(xUtil.typeof(function () {})).toBe("function");
    //test class
    expect(xUtil.typeof(new Date)).toBe("date");

});

it('test xUtil.flatArray', () => {
    //trans value to array
    expect(xUtil.flatArray(1)).toEqual([1]);

    //keep simple array as flat array
    expect(xUtil.flatArray([1])).toEqual([1]);

    //flat embeded array to flat array
    expect(xUtil.flatArray([1, 2])).toEqual([1, 2]);
    expect(xUtil.flatArray([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
    expect(xUtil.flatArray([1, [2, [3, 4], 5], 6])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(xUtil.flatArray([1, [2, [3, [4, 5], 6], 7], 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

    //remove duplicated value from every level
    expect(xUtil.flatArray([1, 1])).toEqual([1]);
    expect(xUtil.flatArray([1, 2, 2])).toEqual([1, 2]);
    expect(xUtil.flatArray([1, [2, 3], 3, 4])).toEqual([1, 2, 3, 4]);
    expect(xUtil.flatArray([1, [2, [3, 4, 5], 5], 6])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(xUtil.flatArray([1, [2, [3, [4, 5], 6], 7], 5, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});