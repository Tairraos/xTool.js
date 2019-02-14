<a name="xtool"></a>

## xtool
Yet another tool package for node

* [xtool](#xtool)
    * [.typeof(arg)](#xtool+typeof) ⇒ <code>string</code>
    * [.is(value, type)](#xtool+is) ⇒ <code>boolean</code>
    * [.flatArray(arg)](#xtool+flatArray) ⇒ <code>array</code>
    * [.readDir(root, [setting])](#xtool+readDir) ⇒ <code>array</code>
    * [.readFile(file, [encoding])](#xtool+readFile) ⇒ <code>string</code>
    * [.existFile(file)](#xtool+existFile) ⇒ <code>boolean</code>
    * [.saveFile(file, content, [encoding])](#xtool+saveFile)
    * [.removeFile(file)](#xtool+removeFile)
    * [.replaceFile(file, patten, replacement)](#xtool+replaceFile)
    * [.scanFile(file, callback)](#xtool+scanFile)
    * [.scanDirFile(list, callback)](#xtool+scanDirFile)

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

<a name="xtool+flatArray"></a>

### xtool.flatArray(arg) ⇒ <code>array</code>
recursive embeded array to a flat array, and will remove duplicated value

**Kind**: instance method of [<code>xtool</code>](#xtool)  
**Returns**: <code>array</code> - return a one dimension array  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>array</code> \| <code>\*</code> | multi dimensions array, other type of arg will return a array warped arg |

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

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| [encoding] | <code>string</code> | encoding |

<a name="xtool+existFile"></a>

### xtool.existFile(file) ⇒ <code>boolean</code>
Alias of fs.existsSync

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |

<a name="xtool+saveFile"></a>

### xtool.saveFile(file, content, [encoding])
Save content to file

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| content | <code>string</code> | file content |
| [encoding] | <code>string</code> | encoding |

<a name="xtool+removeFile"></a>

### xtool.removeFile(file)
Alias of fs.unlinkSync

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |

<a name="xtool+replaceFile"></a>

### xtool.replaceFile(file, patten, replacement)
replace file content with patten & replacement

**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| patten | <code>string</code> \| <code>regexp</code> |  |
| replacement | <code>string</code> | if patten is regexp, the replacement allow to use captured value like $1, $2 |

<a name="xtool+scanFile"></a>

### xtool.scanFile(file, callback)
**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | filename |
| callback | <code>function</code> | call back func(lineContent, lineNumber) |

<a name="xtool+scanDirFile"></a>

### xtool.scanDirFile(list, callback)
**Kind**: instance method of [<code>xtool</code>](#xtool)  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | the file list from readDir() |
| callback | <code>function</code> | call back func(lineContent, lineNumber, fileName) |

