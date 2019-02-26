<a name="xtool"></a>

## xtool
Yet another tool package for node

## Classes

<dl>
<dt><a href="#xBook">xBook</a></dt>
<dd><p>E-Book relative tools of xTool</p>
</dd>
<dt><a href="#xFile">xFile</a></dt>
<dd><p>File relative tools of xTool</p>
</dd>
<dt><a href="#xHtml">xHtml</a></dt>
<dd><p>HTML relative tools of xTool</p>
</dd>
<dt><a href="#xNetwork">xNetwork</a></dt>
<dd><p>Network relative tools of xTool</p>
</dd>
<dt><a href="#xNumber">xNumber</a></dt>
<dd><p>Number relative tools of xTool</p>
</dd>
<dt><a href="#xUtil">xUtil</a></dt>
<dd><p>Utility of xTool</p>
</dd>
</dl>

<a name="xBook"></a>

## xBook
E-Book relative tools of xTool

**Kind**: global class  
<a name="xFile"></a>

## xFile
File relative tools of xTool

**Kind**: global class  

* [xFile](#xFile)
    * [.readDir(root, [setting])](#xFile+readDir) ⇒ <code>array</code>
    * [.readFile(file, [encoding])](#xFile+readFile) ⇒ <code>string</code>
    * [.existFile(file)](#xFile+existFile) ⇒ <code>boolean</code>
    * [.existDir(dir)](#xFile+existDir) ⇒ <code>boolean</code>
    * [.saveFile(file, content, [encoding])](#xFile+saveFile)
    * [.removeFile(file)](#xFile+removeFile) ⇒ <code>boolean</code>
    * [.scanFile(file, callback)](#xFile+scanFile)
    * [.scanListFile(list, callback)](#xFile+scanListFile)
    * [.replaceFile(file, patten|callback, [replacement])](#xFile+replaceFile)

<a name="xFile+readDir"></a>

### xFile.readDir(root, [setting]) ⇒ <code>array</code>
Get file list from a root path with configure

**Kind**: instance method of [<code>xFile</code>](#xFile)  
**Returns**: <code>array</code> - list of file with absolute/relative path  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | file root path |
| [setting] | <code>object</code> \| <code>string</code> | optional, if only one find patten, can be simplify as a string |
| [setting.absolute] | <code>boolean</code> | return absolute path or path relative from root. [default is false] |
| [setting.recursive] | <code>boolean</code> | recursive to sub directory. [default is false] |
| [setting.find] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human patten or human patten list to define filename matcher. [default is "*"] |
| [setting.ignore] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human patten or human patten list to define which filename will be ignored. [default is none] |

<a name="xFile+readFile"></a>

### xFile.readFile(file, [encoding]) ⇒ <code>string</code>
Read file content

**Kind**: instance method of [<code>xFile</code>](#xFile)  
**Returns**: <code>string</code> - if file not exist, will return empty string  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| [encoding] | <code>string</code> | encoding |

<a name="xFile+existFile"></a>

### xFile.existFile(file) ⇒ <code>boolean</code>
Test file exist or not

**Kind**: instance method of [<code>xFile</code>](#xFile)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |

<a name="xFile+existDir"></a>

### xFile.existDir(dir) ⇒ <code>boolean</code>
Test dir exist or not

**Kind**: instance method of [<code>xFile</code>](#xFile)  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>string</code> | path |

<a name="xFile+saveFile"></a>

### xFile.saveFile(file, content, [encoding])
Save content to file

**Kind**: instance method of [<code>xFile</code>](#xFile)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| content | <code>string</code> \| <code>array</code> \| <code>object</code> | file content, array will be join with {crlf}, object will be str |
| [encoding] | <code>string</code> | encoding |

<a name="xFile+removeFile"></a>

### xFile.removeFile(file) ⇒ <code>boolean</code>
Alias of fs.unlinkSync

**Kind**: instance method of [<code>xFile</code>](#xFile)  
**Returns**: <code>boolean</code> - if file not exist, return false  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |

<a name="xFile+scanFile"></a>

### xFile.scanFile(file, callback)
scan file by line, and do callback to content of each line

**Kind**: instance method of [<code>xFile</code>](#xFile)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | filename |
| callback | <code>function</code> | call back func(lineContent, lineNumber) |

<a name="xFile+scanListFile"></a>

### xFile.scanListFile(list, callback)
scan all file in list by line, and do callback to content of each line

**Kind**: instance method of [<code>xFile</code>](#xFile)  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | the file list from readDir() |
| callback | <code>function</code> | call back func(lineContent, lineNumber, fileName) |

<a name="xFile+replaceFile"></a>

### xFile.replaceFile(file, patten|callback, [replacement])
replace file content with patten & replacement

**Kind**: instance method of [<code>xFile</code>](#xFile)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| patten|callback | <code>string</code> \| <code>regexp</code> \| <code>function</code> | - |
| [replacement] | <code>string</code> | if patten provided, replacement must provide, if patten is regexp, replacement can use the captured value by $1, $2, etc. |

<a name="xHtml"></a>

## xHtml
HTML relative tools of xTool

**Kind**: global class  
<a name="xHtml+decodeHtml"></a>

### xHtml.decodeHtml(htmlContent) ⇒ <code>string</code>
transfer &#DDDD; & &#xHHHH; it was. make sure the html page under utf-8;

**Kind**: instance method of [<code>xHtml</code>](#xHtml)  

| Param | Type | Description |
| --- | --- | --- |
| htmlContent | <code>string</code> | included |

<a name="xNetwork"></a>

## xNetwork
Network relative tools of xTool

**Kind**: global class  
<a name="xNetwork+readWebFile"></a>

### xNetwork.readWebFile(url, filename, callback)
async download file from internet

**Kind**: instance method of [<code>xNetwork</code>](#xNetwork)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| filename | <code>string</code> | 
| callback | <code>function</code> | 

<a name="xNumber"></a>

## xNumber
Number relative tools of xTool

**Kind**: global class  

* [xNumber](#xNumber)
    * [new xNumber()](#new_xNumber_new)
    * [.tolerant(num)](#xNumber+tolerant) ⇒ <code>string</code>
    * [.numberChnToBig(num)](#xNumber+numberChnToBig) ⇒ <code>string</code>
    * [.numberChnToSmall(num)](#xNumber+numberChnToSmall) ⇒ <code>string</code>
    * [.numberAri2Chn(num)](#xNumber+numberAri2Chn) ⇒ <code>string</code>
    * [.numberChn2Ari(num)](#xNumber+numberChn2Ari) ⇒ <code>number</code>
    * [.isLegalChnNum(num)](#xNumber+isLegalChnNum) ⇒ <code>string</code>

<a name="new_xNumber_new"></a>

### new xNumber()
constructor

<a name="xNumber+tolerant"></a>

### xNumber.tolerant(num) ⇒ <code>string</code>
修正中文数字常见的错误，并转小写

**Kind**: instance method of [<code>xNumber</code>](#xNumber)  
**Returns**: <code>string</code> - 不校验数字拼写是否正确，只转换常错的拼写  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字 |

<a name="xNumber+numberChnToBig"></a>

### xNumber.numberChnToBig(num) ⇒ <code>string</code>
中文数字小写转大写，“万”，“亿”是不区分大小写的

**Kind**: instance method of [<code>xNumber</code>](#xNumber)  
**Returns**: <code>string</code> - 不校验数字拼写是否正确，只转换大写  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字 |

<a name="xNumber+numberChnToSmall"></a>

### xNumber.numberChnToSmall(num) ⇒ <code>string</code>
中文数字小写转大写，“万”，“亿”是不区分大小写的

**Kind**: instance method of [<code>xNumber</code>](#xNumber)  
**Returns**: <code>string</code> - 不校验数字拼写是否正确，只转换大写  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字 |

<a name="xNumber+numberAri2Chn"></a>

### xNumber.numberAri2Chn(num) ⇒ <code>string</code>
阿拉伯数字转中文数字

**Kind**: instance method of [<code>xNumber</code>](#xNumber)  
**Returns**: <code>string</code> - 返回中文数字  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | 阿拉伯数字，大于零，小于一亿亿。不要使用巨大数字，受V8引擎精度限制，10^16左右就会精度失真。Math.pow(10,16) - 1 === Math.pow(10,16) 为 true |

<a name="xNumber+numberChn2Ari"></a>

### xNumber.numberChn2Ari(num) ⇒ <code>number</code>
中文数字转阿拉伯数字

**Kind**: instance method of [<code>xNumber</code>](#xNumber)  
**Returns**: <code>number</code> - 返回阿拉伯数字, 返回-1表示中文数字非法  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字，大于零，小于一亿亿。不要使用巨大数字。接近或大于一亿亿的时候，V8引擎下的整数会出现精度问题。 |

<a name="xNumber+isLegalChnNum"></a>

### xNumber.isLegalChnNum(num) ⇒ <code>string</code>
检查中文数字合法性，能通过基本容错也为合法

**Kind**: instance method of [<code>xNumber</code>](#xNumber)  
**Returns**: <code>string</code> - true表示合法中文数字  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字，大于零，小于一亿亿 |

<a name="xUtil"></a>

## xUtil
Utility of xTool

**Kind**: global class  

* [xUtil](#xUtil)
    * [.typeof(arg)](#xUtil+typeof) ⇒ <code>string</code>
    * [.is(value, type)](#xUtil+is) ⇒ <code>boolean</code>
    * [.flattenArray(arg)](#xUtil+flattenArray) ⇒ <code>array</code>
    * [.distinctArray(arg)](#xUtil+distinctArray) ⇒ <code>array</code>
    * [.getArgs()](#xUtil+getArgs) ⇒ <code>object</code>

<a name="xUtil+typeof"></a>

### xUtil.typeof(arg) ⇒ <code>string</code>
return the truly type of arg

**Kind**: instance method of [<code>xUtil</code>](#xUtil)  
**Returns**: <code>string</code> - type of arg  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>\*</code> | any type arg |

<a name="xUtil+is"></a>

### xUtil.is(value, type) ⇒ <code>boolean</code>
compare the value type with expect type

**Kind**: instance method of [<code>xUtil</code>](#xUtil)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | value will be test |
| type | <code>\*</code> | expect type |

<a name="xUtil+flattenArray"></a>

### xUtil.flattenArray(arg) ⇒ <code>array</code>
recursive embeded array to a flat array, and will remove duplicated value

**Kind**: instance method of [<code>xUtil</code>](#xUtil)  
**Returns**: <code>array</code> - return a one dimension array  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>array</code> \| <code>\*</code> | multi dimensions array, other type of arg will return a array warped arg |

<a name="xUtil+distinctArray"></a>

### xUtil.distinctArray(arg) ⇒ <code>array</code>
remove duplicated value of array

**Kind**: instance method of [<code>xUtil</code>](#xUtil)  
**Returns**: <code>array</code> - return an array with every unquie value  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>array</code> \| <code>\*</code> | array to remopve duplicated value |

<a name="xUtil+getArgs"></a>

### xUtil.getArgs() ⇒ <code>object</code>
get node command args.

**Kind**: instance method of [<code>xUtil</code>](#xUtil)  
**Returns**: <code>object</code> - - command line: "node xxx.js -x1 y1 -x2 y2", will return {x1:"y1", x2:"y2"}  
