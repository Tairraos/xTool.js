要跑UT请先安装Jest: `npm i jest`

<a name="xtool"></a>

## xtool
Enchance file, number feature of node

<dl>
<dt><a href="#xFile">xFile</a></dt>
<dd><p>File relative tools of xTool</p>
</dd>
<dt><a href="#xHtml">xHtml</a></dt>
<dd><p>HTML relative tools of xTool</p>
</dd>
<dt><a href="#xNumber">xNumber</a></dt>
<dd><p>Number relative tools of xTool</p>
</dd>
<dt><a href="#xUtil">xUtil</a></dt>
<dd><p>Utility of xTool</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#prepareDir">prepareDir(dir)</a></dt>
<dd><p>Prepare directory, will create the full path if not exist</p>
</dd>
<dt><a href="#readDir">readDir(root, [setting])</a> => <code>array</code></dt>
<dd><p>Get file list from a root path with configure</p>
</dd>
<dt><a href="#readFile">readFile(file, [encoding])</a> => <code>string</code></dt>
<dd><p>Read file content</p>
</dd>
<dt><a href="#existFile">existFile(file)</a> => <code>boolean</code></dt>
<dd><p>Test file exist or not</p>
</dd>
<dt><a href="#existDir">existDir(dir)</a> => <code>boolean</code></dt>
<dd><p>Test dir exist or not</p>
</dd>
<dt><a href="#saveFile">saveFile(file, content, [encoding])</a></dt>
<dd><p>Save content to file</p>
</dd>
<dt><a href="#removeFile">removeFile(file)</a> => <code>boolean</code></dt>
<dd><p>Alias of fs.unlinkSync</p>
</dd>
<dt><a href="#scanFile">scanFile(file, callback)</a></dt>
<dd><p>scan file by line, and do callback to content of each line</p>
</dd>
<dt><a href="#scanListFile">scanListFile(list, callback)</a></dt>
<dd><p>scan all file in list by line, and do callback to content of each line</p>
</dd>
<dt><a href="#replaceFile">replaceFile(file, pattern|callback, [replacement])</a></dt>
<dd><p>replace file content with pattern &amp; replacement</p>
</dd>
<dt><a href="#decodeHtml">decodeHtml(htmlContent)</a> => <code>string</code></dt>
<dd><p>transfer &#DDDD; &amp; &#xHHHH; it was. make sure the html page under utf-8;</p>
</dd>
<dt><a href="#tolerant">tolerant(num)</a> => <code>string</code></dt>
<dd><p>修正中文数字常见的错误，并转小写</p>
</dd>
<dt><a href="#numberChnToBig">numberChnToBig(num)</a> => <code>string</code></dt>
<dd><p>中文数字小写转大写，“万”，“亿”是不区分大小写的</p>
</dd>
<dt><a href="#numberChnToSmall">numberChnToSmall(num)</a> => <code>string</code></dt>
<dd><p>中文数字小写转大写，“万”，“亿”是不区分大小写的</p>
</dd>
<dt><a href="#numberAri2Chn">numberAri2Chn(num)</a> => <code>string</code></dt>
<dd><p>阿拉伯数字转中文数字</p>
</dd>
<dt><a href="#numberChn2Ari">numberChn2Ari(num)</a> => <code>number</code></dt>
<dd><p>中文数字转阿拉伯数字</p>
</dd>
<dt><a href="#isLegalChnNum">isLegalChnNum(num)</a> => <code>string</code></dt>
<dd><p>检查中文数字合法性，能通过基本容错也为合法</p>
</dd>
<dt><a href="#numberAri2Roman">numberAri2Roman(num)</a> => <code>string</code></dt>
<dd><p>阿拉伯数字转罗马数字</p>
</dd>
<dt><a href="#numberRoman2Ari">numberRoman2Ari(s)</a> => <code>number</code></dt>
<dd><p>罗马数字转阿拉伯数字</p>
</dd>
<dt><a href="#typeof">typeof(arg)</a> => <code>string</code></dt>
<dd><p>return the truly type of arg</p>
</dd>
<dt><a href="#is">is(value, type)</a> => <code>boolean</code></dt>
<dd><p>compare the value type with expect type</p>
</dd>
<dt><a href="#flattenArray">flattenArray(arg)</a> => <code>array</code></dt>
<dd><p>recursive embeded array to a flat array, and will remove duplicated value</p>
</dd>
<dt><a href="#distinctArray">distinctArray(arg)</a> => <code>array</code></dt>
<dd><p>remove duplicated value of array</p>
</dd>
<dt><a href="#getArgs">getArgs()</a> => <code>object</code></dt>
<dd><p>get node command args</p>
</dd>
<dt><a href="#range">range(start, [end])</a> => <code>array</code></dt>
<dd><p>generate values array of specified range, number range should be 0 to 2^32</p>
</dd>
</dl>

<a name="xFile"></a>

## xFile
File relative tools of xTool

**Kind**: global variable  
<a name="xHtml"></a>

## xHtml
HTML relative tools of xTool

**Kind**: global variable  
<a name="xNumber"></a>

## xNumber
Number relative tools of xTool

**Kind**: global variable  
<a name="xUtil"></a>

## xUtil
Utility of xTool

**Kind**: global variable  
<a name="prepareDir"></a>

## prepareDir(dir)
Enchance file, number feature of node

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>string</code> | the path want to prepared |

**Kind**: global variable  
<a name="readDir"></a>

## readDir(root, [setting]) => <code>array</code>
Get file list from a root path with configure

**Kind**: global function  
**Returns**: <code>array</code> - list of file with absolute/relative path  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | file root path |
| [setting] | <code>object</code> \| <code>string</code> | optional, if only one find pattern, can be simplify as a string |
| [setting.absolute] | <code>boolean</code> | return absolute path or path relative from root. [default is false] |
| [setting.recursive] | <code>boolean</code> | recursive to sub directory. [default is false] |
| [setting.find] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human pattern or human pattern list to define filename matcher. [default is "*"] |
| [setting.ignore] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human pattern or human pattern list to define which filename will be ignored. [default is none] |

<a name="readFile"></a>

## readFile(file, [encoding]) => <code>string</code>
Read file content

**Kind**: global function  
**Returns**: <code>string</code> - if file not exist, will return empty string  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| [encoding] | <code>string</code> | encoding |

<a name="existFile"></a>

## existFile(file) => <code>boolean</code>
Test file exist or not

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |

<a name="existDir"></a>

## existDir(dir) => <code>boolean</code>
Test dir exist or not

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>string</code> | path |

<a name="saveFile"></a>

## saveFile(file, content, [encoding])
Save content to file

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| content | <code>string</code> \| <code>array</code> \| <code>object</code> | file content, array will be join with {crlf}, object will be str |
| [encoding] | <code>string</code> | encoding |

<a name="removeFile"></a>

## removeFile(file) => <code>boolean</code>
Alias of fs.unlinkSync

**Kind**: global function  
**Returns**: <code>boolean</code> - if file not exist, return false  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |

<a name="scanFile"></a>

## scanFile(file, callback)
scan file by line, and do callback to content of each line

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | filename |
| callback | <code>function</code> | call back func(lineContent, lineNumber) |

<a name="scanListFile"></a>

## scanListFile(list, callback)
scan all file in list by line, and do callback to content of each line

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | the file list from readDir() |
| callback | <code>function</code> | call back func(lineContent, lineNumber, fileName) |

<a name="replaceFile"></a>

## replaceFile(file, pattern|callback, [replacement])
replace file content with pattern & replacement

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| pattern|callback | <code>string</code> \| <code>regexp</code> \| <code>function</code> | - |
| [replacement] | <code>string</code> | if pattern provided, replacement must provide, if pattern is regexp, replacement can use the captured value by $1, $2, etc. |

<a name="decodeHtml"></a>

## decodeHtml(htmlContent) => <code>string</code>
transfer &#DDDD; & &#xHHHH; it was. make sure the html page under utf-8;

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| htmlContent | <code>string</code> | included |

<a name="tolerant"></a>

## tolerant(num) => <code>string</code>
修正中文数字常见的错误，并转小写

**Kind**: global function  
**Returns**: <code>string</code> - 不校验数字拼写是否正确，只转换常错的拼写  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字 |

<a name="numberChnToBig"></a>

## numberChnToBig(num) => <code>string</code>
中文数字小写转大写，“万”，“亿”是不区分大小写的

**Kind**: global function  
**Returns**: <code>string</code> - 不校验数字拼写是否正确，只转换大写  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字 |

<a name="numberChnToSmall"></a>

## numberChnToSmall(num) => <code>string</code>
中文数字小写转大写，“万”，“亿”是不区分大小写的

**Kind**: global function  
**Returns**: <code>string</code> - 不校验数字拼写是否正确，只转换大写  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字 |

<a name="numberAri2Chn"></a>

## numberAri2Chn(num) => <code>string</code>
阿拉伯数字转中文数字

**Kind**: global function  
**Returns**: <code>string</code> - 返回中文数字  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | 阿拉伯数字，大于零，小于一亿亿。不要使用巨大数字，受V8引擎精度限制，10^16左右就会精度失真。Math.pow(10,16) - 1 === Math.pow(10,16) 为 true |

<a name="numberChn2Ari"></a>

## numberChn2Ari(num) => <code>number</code>
中文数字转阿拉伯数字

**Kind**: global function  
**Returns**: <code>number</code> - 返回阿拉伯数字, 返回-1表示中文数字非法  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字，大于零，小于一亿亿。不要使用巨大数字。接近或大于一亿亿的时候，V8引擎下的整数会出现精度问题。 |

<a name="isLegalChnNum"></a>

## isLegalChnNum(num) => <code>string</code>
检查中文数字合法性，能通过基本容错也为合法

**Kind**: global function  
**Returns**: <code>string</code> - true表示合法中文数字  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字，大于零，小于一亿亿 |

<a name="numberAri2Roman"></a>

## numberAri2Roman(num) => <code>string</code>
阿拉伯数字转罗马数字

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | 范围0-3999 |

<a name="numberRoman2Ari"></a>

## numberRoman2Ari(s) => <code>number</code>
罗马数字转阿拉伯数字

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| s | <code>string</code> | 范围0-3999 |

<a name="typeof"></a>

## typeof(arg) => <code>string</code>
return the truly type of arg

**Kind**: global function  
**Returns**: <code>string</code> - type of arg  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>\*</code> | any type arg |

<a name="is"></a>

## is(value, type) => <code>boolean</code>
compare the value type with expect type

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | value will be test |
| type | <code>string</code> | expect type |

<a name="flattenArray"></a>

## flattenArray(arg) => <code>array</code>
recursive embeded array to a flat array, and will remove duplicated value

**Kind**: global function  
**Returns**: <code>array</code> - return a one dimension array  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>array</code> \| <code>\*</code> | multi dimensions array, other type of arg will return a array warped arg |

<a name="distinctArray"></a>

## distinctArray(arg) => <code>array</code>
remove duplicated value of array

**Kind**: global function  
**Returns**: <code>array</code> - return an array with every unquie value  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>array</code> \| <code>\*</code> | array to remopve duplicated value |

<a name="getArgs"></a>

## getArgs() => <code>object</code>
get node command args

**Kind**: global function  
**Returns**: <code>object</code> - - command line: "node xxx.js -a 111 -b=222 333 -d", will return 
    {
        0: ["-a", "111", "-b=222", "333", "-d"],
        1: "-a",
        2: "111",
        3: "-b=222",
        4: "333",
        "5": "-d",
        "-a": "111",
        "-b": "222",
        "-d": true
   }  
<a name="range"></a>

## range(start, [end]) => <code>array</code>
generate values array of specified range, number range should be 0 to 2^32

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>number</code> \| <code>string</code> | if "end" is not provided, the range is (0 or "0" or "a" or "A") to "start" |
| [end] | <code>number</code> \| <code>string</code> |  |

