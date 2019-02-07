const xFile = require('../xFile');

describe('test xFile.resolvePatten', () => {
    it("test illegal params will be a empty matched regexp", () => {
        expect(xFile.resolvePatten([])).toEqual([]);
        expect(xFile.resolvePatten()).toEqual([/^$/]);
        expect(xFile.resolvePatten({})).toEqual([/^$/]);
    });

    it("test number", () => {
        expect(xFile.resolvePatten(1)).toEqual([/^1$/]);
    });

    it("test string", () => {
        expect(xFile.resolvePatten("file")).toEqual([/^file$/]);
        expect(xFile.resolvePatten("file.txt")).toEqual([/^file\.txt$/]);
    });

    it("test wildcard", () => {
        expect(xFile.resolvePatten("*.txt")).toEqual([/^.+\.txt$/]);
        expect(xFile.resolvePatten("*.*")).toEqual([/^.+\..+$/]);
        expect(xFile.resolvePatten("test?.*")).toEqual([/^test.\..+$/]);
        expect(xFile.resolvePatten("*.*")).toEqual([/^.+\..+$/]);
    });

    it("test directory", () => {
        expect(xFile.resolvePatten("/a/b/")).toEqual([/\/a\/b\//]);
        expect(xFile.resolvePatten("a.b/")).toEqual([/a\.b\//]);
    });

    it("test regexp", () => {
        expect(xFile.resolvePatten(/test\.file/)).toEqual([/test\.file/]);
    });

    it("test array", () => {
        expect(xFile.resolvePatten([1, "file.txt", "*.txt", /test\.file/])).toEqual([/^1$/, /^file\.txt$/, /^.+\.txt$/, /test\.file/]);
    });

    it("test recursive array", () => {
        expect(xFile.resolvePatten([1, "file.txt", ["*.txt", /test\.file/]])).toEqual([/^1$/, /^file\.txt$/, /^.+\.txt$/, /test\.file/]);
    });

    it("test duplicated item array", () => {
        expect(xFile.resolvePatten(["*.*", "*.*"])).toEqual([/^.+\..+$/]);
    });
});

describe('test xFile.matcher', () => {
    it("test file match", () => {
        expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.*"))).toBeTruthy();
        expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.txt"))).toBeTruthy();
        expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("test*.txt"))).toBeTruthy();
        expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("testFileName.txt"))).toBeTruthy();
        expect(xFile.matcher("testFileName5.txt", xFile.resolvePatten("testFileName?.txt"))).toBeTruthy();
    });

    it("test file unmatch", () => {
        expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.js"))).toBeFalsy();
        expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.txtt"))).toBeFalsy();
        expect(xFile.matcher("testFileName5.txt", xFile.resolvePatten("testFileName??.txt"))).toBeFalsy();
        expect(xFile.matcher("testFileName.", xFile.resolvePatten("*.*"))).toBeFalsy();
    });

    it("test path match", () => {});
});