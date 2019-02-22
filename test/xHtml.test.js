const xHtml = require('../src/xHtml');

describe('test xHtml.xxxx', () => {

    it("test decodeHtml", () => {
        expect(xHtml.decodeHtml("&#x5165;&#x53E3;")).toBe("入口");
        expect(xHtml.decodeHtml("&#36755;&#20986;")).toBe("输出");
    });
});