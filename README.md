<a name="xtool"></a>

## xtool
Yet another tool package for node

<a name="xtool"></a>

* [xtool](#xtool)
    * [.readDir(root, [setting])](#xtool+readDir) ⇒ <code>array</code>
    * [.readFile(file, [encoding])](#xtool+readFile) ⇒ <code>string</code>
    * [.existFile(file)](#xtool+existFile) ⇒ <code>boolean</code>
    * [.existDir(dir)](#xtool+existDir) ⇒ <code>boolean</code>
    * [.saveFile(file, content, [encoding])](#xtool+saveFile)
    * [.removeFile(file)](#xtool+removeFile) ⇒ <code>boolean</code>
    * [.scanFile(file, callback)](#xtool+scanFile)
    * [.scanListFile(list, callback)](#xtool+scanListFile)
    * [.replaceFile(file, patten|callback, [replacement])](#xtool+replaceFile)
    * [.readWebFile(url, filename, callback)](#xtool+readWebFile)
    * [.decodeHtml(htmlContent)](#xtool+decodeHtml) ⇒ <code>string</code>
    * [.tolerant(arg)](#xtool+tolerant) ⇒ <code>string</code>
    * [.numberChnToBig(arg)](#xtool+numberChnToBig) ⇒ <code>string</code>
    * [.numberAri2Chn(num)](#xtool+numberAri2Chn) ⇒ <code>string</code>
    * [.numberChn2Ari(num)](#xtool+numberChn2Ari) ⇒ <code>number</code>
    * [.numberTestChn(num)](#xtool+numberTestChn) ⇒ <code>string</code>
    * [.typeof(arg)](#xtool+typeof) ⇒ <code>string</code>
    * [.is(value, type)](#xtool+is) ⇒ <code>boolean</code>
    * [.flattenArray(arg)](#xtool+flattenArray) ⇒ <code>array</code>
    * [.distinctArray(arg)](#xtool+distinctArray) ⇒ <code>array</code>

<a name="xtool+readDir"></a>

### xtool.readDir(root, [setting]) ⇒ <code>array</code>
Get file list from a root path with configure

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>array</code> - list of file with absolute/relative path  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | file root path |
| [setting] | <code>object</code> \| <code>string</code> | optional, if only one find patten, can be simplify as a string |
| [setting.absolute] | <code>boolean</code> | return absolute path or path relative from root. [default is false] |
| [setting.recursive] | <code>boolean</code> | recursive to sub directory. [default is false] |
| [setting.find] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human patten or human patten list to define filename matcher. [default is "*"] |
| [setting.ignore] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human patten or human patten list to define which filename will be ignored. [default is none] |

<a name="xtool+readFile"></a>

### xtool.readFile(file, [encoding]) ⇒ <code>string</code>
Read file content

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>string</code> - if file not exist, will return empty string  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| [encoding] | <code>string</code> | encoding |

<a name="xtool+existFile"></a>

### xtool.existFile(file) ⇒ <code>boolean</code>
Test file exist or not

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |

<a name="xtool+existDir"></a>

### xtool.existDir(dir) ⇒ <code>boolean</code>
Test dir exist or not

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>string</code> | path |

<a name="xtool+saveFile"></a>

### xtool.saveFile(file, content, [encoding])
Save content to file

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| content | <code>string</code> \| <code>array</code> \| <code>object</code> | file content, array will be join with {crlf}, object will be str |
| [encoding] | <code>string</code> | encoding |

<a name="xtool+removeFile"></a>

### xtool.removeFile(file) ⇒ <code>boolean</code>
Alias of fs.unlinkSync

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>boolean</code> - if file not exist, return false  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |

<a name="xtool+scanFile"></a>

### xtool.scanFile(file, callback)
scan file by line, and do callback to content of each line

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | filename |
| callback | <code>function</code> | call back func(lineContent, lineNumber) |

<a name="xtool+scanListFile"></a>

### xtool.scanListFile(list, callback)
scan all file in list by line, and do callback to content of each line

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | the file list from readDir() |
| callback | <code>function</code> | call back func(lineContent, lineNumber, fileName) |

<a name="xtool+replaceFile"></a>

### xtool.replaceFile(file, patten|callback, [replacement])
replace file content with patten & replacement

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| patten|callback | <code>string</code> \| <code>regexp</code> \| <code>function</code> | - |
| [replacement] | <code>string</code> | if patten provided, replacement must provide, if patten is regexp, replacement can use the captured value by $1, $2, etc. |

<a name="xtool+decodeHtml"></a>

### xtool.decodeHtml(htmlContent) ⇒ <code>string</code>
transfer &#DDDD; & &#xHHHH; it was. make sure the html page under utf-8;

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| htmlContent | <code>string</code> | included |


<a name="xtool+readWebFile"></a>

### xtool.readWebFile(url, filename, callback)
async download file from internet

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| filename | <code>string</code> | 
| callback | <code>function</code> | 


<a name="xtool+tolerant"></a>

### xtool.tolerant(arg) ⇒ <code>string</code>
修正中文数字常见的错误，并转小写

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>string</code> - 不校验数字拼写是否正确，只转换常错的拼写  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>string</code> | 中文数字 |

<a name="xtool+numberChnToBig"></a>

### xtool.numberChnToBig(arg) ⇒ <code>string</code>
中文数字小写转大写，“万”，“亿”是不区分大小写的

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>string</code> - 不校验数字拼写是否正确，只转换大写  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>string</code> | 中文数字 |

<a name="xtool+numberAri2Chn"></a>

### xtool.numberAri2Chn(num) ⇒ <code>string</code>
阿拉伯数字转中文数字

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>string</code> - 返回中文数字  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | 阿拉伯数字，不要使用巨大数字，受V8引擎精度限制，10^16左右就会精度失真。Math.pow(10,16) - 1 === Math.pow(10,16) 为 true |

<a name="xtool+numberChn2Ari"></a>

### xtool.numberChn2Ari(num) ⇒ <code>number</code>
中文数字转阿拉伯数字

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>number</code> - 返回阿拉伯数字  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字，不要使用巨大数字。接近或大于一亿亿的时候，V8引擎下的整数会出现精度问题。 |

<a name="xtool+numberTestChn"></a>

### xtool.numberTestChn(num) ⇒ <code>string</code>
检查中文数字是否合法，非法返回空字串。如果中文数字可容错，会返回正确的中文数字拼写

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>string</code> | 中文数字 |


<a name="xtool+typeof"></a>

### xtool.typeof(arg) ⇒ <code>string</code>
return the truly type of arg

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>string</code> - type of arg  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>\*</code> | any type arg |

<a name="xtool+is"></a>

### xtool.is(value, type) ⇒ <code>boolean</code>
compare the value type with expect type

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | value will be test |
| type | <code>\*</code> | expect type |

<a name="xtool+flattenArray"></a>

### xtool.flattenArray(arg) ⇒ <code>array</code>
recursive embeded array to a flat array, and will remove duplicated value

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>array</code> - return a one dimension array  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>array</code> \| <code>\*</code> | multi dimensions array, other type of arg will return a array warped arg |

<a name="xtool+distinctArray"></a>

### xtool.distinctArray(arg) ⇒ <code>array</code>
remove duplicated value of array

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>array</code> - return an array with every unquie value  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>array</code> \| <code>\*</code> | array to remopve duplicated value |

