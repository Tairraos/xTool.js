# Logger.js

- Web App 适用
- 支持Indexed DB，可以随时提取历史Log
- 提供源代码Log压缩工具，压缩源代码里的Log，使打包出来的JS文件更小
- 压缩工具提取源代码里的Log，生成Log字典。源代码里只留下Log ID
- Log压缩后即使在打包后的代码里输出Log依然能识别Log所在的源文件
