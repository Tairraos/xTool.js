
## xtool
<a name="xtool"></a>
Yet another tool package for node.

* [xtool](#xtool)
    * [.typeof(arg)](#xUtil+typeof) ⇒ <code>string</code>
    * [.is(value, type)](#xUtil+is) ⇒ <code>boolean</code>
    * [.flatArray(arg)](#xUtil+flatArray) ⇒ <code>array</code>
    * [.readDir(root, [setting])](#xFile+readDir) ⇒ <code>array</code>
    * [.readFile(file, [encoding])](#xFile+readFile) ⇒ <code>string</code>
    * [.saveFile(file, content, [encoding])](#xFile+saveFile)

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

<a name="xUtil+flatArray"></a>

### xUtil.flatArray(arg) ⇒ <code>array</code>
recursive embeded array to a flat array, and will remove duplicated value

**Kind**: instance method of [<code>xUtil</code>](#xUtil)  
**Returns**: <code>array</code> - return a one dimension array  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>array</code> \| <code>\*</code> | multi dimensions array, other type of arg will return a array warped arg |

<a name="xFile+readDir"></a>

### xFile.readDir(root, [setting]) ⇒ <code>array</code>
Get file list from a root path with configure

**Kind**: instance method of [<code>xFile</code>](#xFile)  
**Returns**: <code>array</code> - list of file with absolute/relative path  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | file root path |
| [setting] | <code>object</code> | optional |
| [setting.absolute] | <code>boolean</code> | return absolute path or path relative from root. [default is false] |
| [setting.recursive] | <code>boolean</code> | recursive to sub directory. [default is false] |
| [setting.find] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human patten or human patten list to define filename matcher. [default is "*"] |
| [setting.ignore] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human patten or human patten list to define which filename will be ignored. [default is none] |

<a name="xFile+readFile"></a>

### xFile.readFile(file, [encoding]) ⇒ <code>string</code>
Read file content

**Kind**: instance method of [<code>xFile</code>](#xFile)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| [encoding] | <code>string</code> | encoding |

<a name="xFile+saveFile"></a>

### xFile.saveFile(file, content, [encoding])
Save content to file

**Kind**: instance method of [<code>xFile</code>](#xFile)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | path to file |
| content | <code>string</code> | file content |
| [encoding] | <code>string</code> | encoding |
