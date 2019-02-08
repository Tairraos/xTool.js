const xFile = require('../src/xFile');

describe('test xFile.resolvePatten', () => {
    it("test illegal params will be a empty matched regexp", () => {
        expect(xFile._resolvePatten([])).toEqual([]);
        expect(xFile._resolvePatten()).toEqual([/$.^/]);
        expect(xFile._resolvePatten({})).toEqual([/$.^/]);
    });

    it("test number", () => {
        expect(xFile._resolvePatten(1)).toEqual([/^1$/]);
    });

    it("test string", () => {
        expect(xFile._resolvePatten("file")).toEqual([/^file$/]);
        expect(xFile._resolvePatten("file.txt")).toEqual([/^file\.txt$/]);
    });

    it("test wildcard", () => {
        expect(xFile._resolvePatten("*.txt")).toEqual([/^.+\.txt$/]);
        expect(xFile._resolvePatten("*.*")).toEqual([/^.+\..+$/]);
        expect(xFile._resolvePatten("test?.*")).toEqual([/^test.\..+$/]);
        expect(xFile._resolvePatten("*.*")).toEqual([/^.+\..+$/]);
    });

    it("test directory", () => {
        expect(xFile._resolvePatten("/a/b/")).toEqual([/\/a\/b\//]);
        expect(xFile._resolvePatten("a.b/")).toEqual([/a\.b\//]);
    });

    it("test regexp", () => {
        expect(xFile._resolvePatten(/test\.file/)).toEqual([/test\.file/]);
    });

    it("test array", () => {
        expect(xFile._resolvePatten([1, "file.txt", "*.txt", /test\.file/])).toEqual([/^1$/, /^file\.txt$/, /^.+\.txt$/, /test\.file/]);
    });

    it("test recursive array", () => {
        expect(xFile._resolvePatten([1, "file.txt", ["*.txt", /test\.file/]])).toEqual([/^1$/, /^file\.txt$/, /^.+\.txt$/, /test\.file/]);
    });

    it("test duplicated item array", () => {
        expect(xFile._resolvePatten(["*.*", "*.*"])).toEqual([/^.+\..+$/]);
    });
});

describe('test xFile.pattenMatcher', () => {
    it("test unresolved match", () => {
        expect(xFile._pattenMatcher("testFileName.txt", "*.*")).toBeTruthy();
        expect(xFile._pattenMatcher("testFileName.txt", ["*.*"])).toBeFalsy();
    });

    it("test file match", () => {
        expect(xFile._pattenMatcher("testFileName.txt", xFile._resolvePatten("*.*"))).toBeTruthy();
        expect(xFile._pattenMatcher("testFileName.txt", xFile._resolvePatten("*.txt"))).toBeTruthy();
        expect(xFile._pattenMatcher("testFileName.txt", xFile._resolvePatten("test*.txt"))).toBeTruthy();
        expect(xFile._pattenMatcher("testFileName.txt", xFile._resolvePatten("testFileName.txt"))).toBeTruthy();
        expect(xFile._pattenMatcher("testFileName5.txt", xFile._resolvePatten("testFileName?.txt"))).toBeTruthy();
    });

    it("test file unmatch", () => {
        expect(xFile._pattenMatcher("testFileName.txt", xFile._resolvePatten("*.js"))).toBeFalsy();
        expect(xFile._pattenMatcher("testFileName.txt", xFile._resolvePatten("*.txtt"))).toBeFalsy();
        expect(xFile._pattenMatcher("testFileName5.txt", xFile._resolvePatten("testFileName??.txt"))).toBeFalsy();
        expect(xFile._pattenMatcher("testFileName.", xFile._resolvePatten("*.*"))).toBeFalsy();
    });

    it("test path match", () => {
        expect(xFile._pattenMatcher("/test/path/to/file.txt", xFile._resolvePatten("to/"))).toBeTruthy();
        expect(xFile._pattenMatcher("/test/path/to/file.txt", xFile._resolvePatten("/to/"))).toBeTruthy();
        expect(xFile._pattenMatcher("/test/path/to/file.txt", xFile._resolvePatten("to"))).toBeFalsy();
        expect(xFile._pattenMatcher("/test/path/to/file.txt", xFile._resolvePatten(["to", "to/"]))).toBeTruthy();
        expect(xFile._pattenMatcher("/test/path/to/file.txt", xFile._resolvePatten("path/to/"))).toBeTruthy();
        expect(xFile._pattenMatcher("/test/path/to/file.txt", xFile._resolvePatten("to/file.txt"))).toBeTruthy();
    });
});

describe('test xFile.readDir', () => {
    it("test unresolved match", () => {
        expect(xFile.readDir(".")).toContain("README.md");
        expect(xFile.readDir(".", {find: "*.md"})).toContain("README.md");
        expect(xFile.readDir(".", {find: "*.js"})).not.toContain("README.md");
        expect(xFile.readDir(".", {find: "*.json"})).toContain("package.json");
        expect(xFile.readDir(".", {find: "*.json", ignore: ["node_modules/", "package.json"]})).not.toContain("package.json");
        expect(xFile.readDir(".", {find: "*.js", ignore: "node_modules/", recursive: true})).toContain("src/xFile.js");
        expect(xFile.readDir(".", {find: "*.js", ignore: "node_modules/", absolute: true})).not.toContain("src/xFile.js");
        expect(xFile.readDir("/etc", {find: "hosts", absolute: true})).toContain("/etc/hosts");
    });
});

describe('test xFile.readFile & xFile.saveFile', () => {
    it("test unresolved match", () => {
        expect(xFile.saveFile("_tmp.txt", "test content", "utf-8"));
        expect(xFile.readFile("_tmp.txt", "utf-8")).toBe("test content");
        expect(xFile.saveFile("_tmp.txt", "test content\nantoher line"));
        expect(xFile.readFile("_tmp.txt")).toBe("test content\nantoher line");
    });
});