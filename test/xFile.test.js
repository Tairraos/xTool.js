const fs = require("fs"),
    xFile = require('../src/xFile');

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
    it("test readDir", () => {
        expect(xFile.readDir()).toContain("README.md");
        expect(xFile.readDir(".")).toContain("README.md");
        expect(xFile.readDir(".", {
            find: "*.md"
        })).toContain("README.md");
        expect(xFile.readDir(".", {
            find: "*.js"
        })).not.toContain("README.md");
        expect(xFile.readDir(".", {
            find: "*.json"
        })).toContain("package.json");
        expect(xFile.readDir(".", {
            find: "*.json",
            ignore: ["node_modules/", "package.json"]
        })).not.toContain("package.json");
        expect(xFile.readDir(".", {
            find: "*.js",
            ignore: "node_modules/",
            recursive: true
        })).toContain("src/xFile.js");
        expect(xFile.readDir(".", {
            find: "*.js",
            ignore: "node_modules/",
            absolute: true
        })).not.toContain("src/xFile.js");
        expect(xFile.readDir("/etc", {
            find: "hosts",
            absolute: true
        })).toContain("/etc/hosts");
    });
});

describe('test xFile.readFile & saveFile & existFile & removeFile & replaceFile', () => {
    it("test file function", () => {
        xFile.existFile("_tmp.txt") && xFile.removeFile("_tmp.txt");
        xFile.existFile("_tmp1/tmp2/_tmp.txt") && xFile.removeFile("_tmp1/tmp2/_tmp.txt");
        xFile.existDir("_tmp1/tmp2") && fs.rmdirSync("_tmp1/tmp2");
        xFile.existDir("_tmp1") && fs.rmdirSync("_tmp1");
        expect(xFile.saveFile("_tmp1/tmp2/_tmp.txt", "test content", "utf-8"));
        expect(xFile.readFile("_tmp1/tmp2/_tmp.txt", "utf-8")).toBe("test content");
        expect(xFile.saveFile("_tmp.txt", "test content", "utf-8"));
        expect(xFile.readFile("_tmp.txt", "utf-8")).toBe("test content");
        expect(xFile.saveFile("_tmp.txt", ["test content", "antoher line"]));
        expect(xFile.readFile("_tmp.txt")).toBe("test content\nantoher line");
        expect(xFile.saveFile("_tmp.txt", {"test": "content","antoher": "line"}));
        expect(xFile.readFile("_tmp.txt")).toBe("{\"test\":\"content\",\"antoher\":\"line\"}");
        expect(xFile.replaceFile("_tmp.txt", "content", "line")).toBeUndefined();
        expect(xFile.readFile("_tmp.txt")).toBe("{\"test\":\"line\",\"antoher\":\"line\"}");
        expect(xFile.replaceFile("_tmp.txt", /line/g, "LINE")).toBeUndefined();
        expect(xFile.readFile("_tmp.txt")).toBe("{\"test\":\"LINE\",\"antoher\":\"LINE\"}");
        expect(xFile.existFile("_tmp.txt")).toBeTruthy();
        expect(xFile.removeFile("_tmp.txt")).toBeUndefined();
        expect(xFile.removeFile("_tmp4.txt")).toBeFalsy();
        expect(xFile.existFile("_tmp.txt")).toBeFalsy();
        expect(xFile.existDir("src")).toBeTruthy();
        expect(xFile.existDir("src2")).toBeFalsy();
        expect(xFile.readFile("_tmp2.txt")).toBe("");
        expect(xFile.saveFile(["_tmp.txt"], "test content"));
        xFile.existFile("_tmp.txt") && xFile.removeFile("_tmp.txt");
        xFile.existFile("_tmp1/tmp2/_tmp.txt") && xFile.removeFile("_tmp1/tmp2/_tmp.txt");
        xFile.existDir("_tmp1/tmp2") && fs.rmdirSync("_tmp1/tmp2");
        xFile.existDir("_tmp1") && fs.rmdirSync("_tmp1");
    });
});


describe('test scanFile && scanDirFile', () => {
    it("test scan function", () => {
        expect(xFile.saveFile("_tmp.1.txt", "line1 test\nline2 test\nline3 test", "utf-8"));
        expect(xFile.saveFile("_tmp.2.txt", "line4 test\nline5 test\nline6 test", "utf-8"));
        expect(xFile.saveFile("_tmp.3.txt", "line7 test\nline8 test\nline9 test", "utf-8"));
        let tmp1 = [];
        xFile.scanFile("_tmp.1.txt", (line, index) => tmp1.push(line));
        expect(xFile.scanFile(["_tmp.1.txt"], (line, index) => tmp1.push(line))).toBeUndefined();
        expect(xFile.scanFile("_tmp.1.txt", {})).toBeUndefined();
        expect(xFile.scanFile("_tmp.5.txt", (line, index) => tmp1.push(line))).toBeUndefined();

        let tmp2 = [],
            fileList = xFile.readDir(".", "_tmp.*.txt");
        expect(xFile.scanListFile("_tmp.5.txt", (line, index, file) => tmp2.push(line))).toBeUndefined();
        expect(xFile.scanListFile(fileList, {})).toBeUndefined();
        expect(xFile.scanListFile(["_tmp.5.txt"], (line, index, file) => tmp2.push(line))).toBeUndefined();
        expect(xFile.scanListFile([100], (line, index, file) => tmp2.push(line))).toBeUndefined();
        xFile.scanListFile(fileList, (line, index, file) => tmp2.push(line));
        expect(tmp2).toEqual(["line1 test", "line2 test", "line3 test", "line4 test", "line5 test", "line6 test", "line7 test", "line8 test", "line9 test"]);
        expect(xFile.removeFile("_tmp.1.txt")).toBeUndefined();
        expect(xFile.removeFile("_tmp.2.txt")).toBeUndefined();
        expect(xFile.removeFile("_tmp.3.txt")).toBeUndefined();
    });
});