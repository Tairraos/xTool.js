const xFile = require('../xFile');

it('test xFile.resolvePatten', () => {
    //test illegal params will be a empty matched regexp
    expect(xFile.resolvePatten()).toEqual([/^$/]);
    expect(xFile.resolvePatten({})).toEqual([/^$/]);

    //test number
    expect(xFile.resolvePatten(1)).toEqual([/^1$/]);

    //test string
    expect(xFile.resolvePatten("file")).toEqual([/^file$/]);
    expect(xFile.resolvePatten("file.txt")).toEqual([/^file\.txt$/]);
    expect(xFile.resolvePatten("*.txt")).toEqual([/^.*\.txt$/]);
    expect(xFile.resolvePatten("*.*")).toEqual([/^.*\..*$/]);

    //test directory
    expect(xFile.resolvePatten("a.b/")).toEqual([/a\.b\//]);

    //test regexp
    expect(xFile.resolvePatten(/test\.file/)).toEqual([/test\.file/]);

    //test array
    expect(xFile.resolvePatten([1, "file.txt", "*.txt", /test\.file/])).toEqual([/^1$/, /^file\.txt$/, /^.*\.txt$/, /test\.file/]);

    //test recursive array
    expect(xFile.resolvePatten([1, "file.txt", ["*.txt", /test\.file/]])).toEqual([/^1$/, /^file\.txt$/, /^.*\.txt$/, /test\.file/]);

    //test duplicated item array
    expect(xFile.resolvePatten(["*.*", "*.*"])).toEqual([/^.*\..*$/]);
});

it('test xFile.matcher', () => {
    //test file match
    expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.*"))).toBeTruthy();
    expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.txt"))).toBeTruthy();
    expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("test*.txt"))).toBeTruthy();
    expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("testFileName.txt"))).toBeTruthy();

    //test file unmatch
    expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.js"))).toBeFalsy();
    expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.txtt"))).toBeFalsy();
    expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.*"))).toBeTruthy();
    expect(xFile.matcher("testFileName.txt", xFile.resolvePatten("*.*"))).toBeTruthy();

    //test path match
});