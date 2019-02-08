<a name="xFile"></a>

## xFile
File relative tools of xTool

**Kind**: global class  

* [xFile](#xFile)
    * [.resolvePatten(patten)](#xFile+resolvePatten) ⇒ <code>array</code>
    * [.matcher(item, pattenList, [isDir])](#xFile+matcher) ⇒ <code>boolean</code>
    * [.getFileList(root, [setting])](#xFile+getFileList) ⇒ <code>array</code>

<a name="xFile+resolvePatten"></a>

### xFile.resolvePatten(patten) ⇒ <code>array</code>
Resolve patten, transfer wildcard patten to regexp format

**Kind**: instance method of [<code>xFile</code>](#xFile)  
**Returns**: <code>array</code> - will return an array of patten  

| Param | Type |
| --- | --- |
| patten | <code>string</code> \| <code>regexp</code> \| <code>array</code> | 

<a name="xFile+matcher"></a>

### xFile.matcher(item, pattenList, [isDir]) ⇒ <code>boolean</code>
Test item, does this item match at least one patten of list.

**Kind**: instance method of [<code>xFile</code>](#xFile)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>string</code> | item of directory list, file or sub-directory |
| pattenList | <code>array</code> | patten array |
| [isDir] | <code>boolean</code> | optional |

<a name="xFile+getFileList"></a>

### xFile.getFileList(root, [setting]) ⇒ <code>array</code>
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

<a name="xUtil"></a>

## xUtil
Utility of xTool

**Kind**: global class  

* [xUtil](#xUtil)
    * [.typeof(arg)](#xUtil+typeof)
    * [.flatArray(item)](#xUtil+flatArray)

<a name="xUtil+typeof"></a>

### xUtil.typeof(arg)
return the truly type of arg

**Kind**: instance method of [<code>xUtil</code>](#xUtil)  

| Param | Type |
| --- | --- |
| arg | <code>\*</code> | 

<a name="xUtil+flatArray"></a>

### xUtil.flatArray(item)
recursive embeded array to a flat array, and will remove duplicated value

**Kind**: instance method of [<code>xUtil</code>](#xUtil)  

| Param | Type |
| --- | --- |
| item | <code>array</code> \| <code>\*</code> | 

