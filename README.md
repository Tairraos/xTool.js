
## xtool
<a name="xtool"></a>
Yet another tool package for node.

* [xtool](#xtool)
    * [.typeof(arg)](#xtool+typeof) ⇒ <code>string</code>
    * [.readDir(root, [setting])](#xtool+readDir) ⇒ <code>array</code>
    * [.flatArray(item)](#xtool+flatArray) ⇒ <code>array</code>


<a name="xtool+typeof"></a>

### xtool.typeof(arg) ⇒ <code>string</code>
return the truly type of arg

**Returns**: <code>string</code> - type of arg  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>\*</code> | type arg |

<a name="xtool+readDir"></a>

### xtool.readDir(root, [setting]) ⇒ <code>array</code>
Get file list from a root path with configure

**Returns**: <code>array</code> - list of file with absolute/relative path  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | file root path |
| [setting] | <code>object</code> | optional |
| [setting.absolute] | <code>boolean</code> | return absolute path or path relative from root. [default is false] |
| [setting.recursive] | <code>boolean</code> | recursive to sub directory. [default is false] |
| [setting.find] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human patten or human patten list to define filename matcher. [default is "*"] |
| [setting.ignore] | <code>string</code> \| <code>regexp</code> \| <code>array</code> | provide human patten or human patten list to define which filename will be ignored. [default is none] |

<a name="xtool+flatArray"></a>

### xtool.flatArray(arg) ⇒ <code>array</code>
recursive embeded array to a flat array, and will remove duplicated value

**Returns**: <code>array</code> - return a one dimension array  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>array</code> \| <code>\*</code> | dimensions array, other type of arg will return a array warped arg |

