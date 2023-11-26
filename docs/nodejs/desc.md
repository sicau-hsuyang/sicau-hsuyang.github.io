## Nodejs 中常见的坑点

本文主要列举我在 Nodejs 中开发中遇到过的坑点。

### 1、CommonJS 和 ESM

Node.js 官方开始支持 ESM 是从 Node.js 版本 13.2.0 开始的。这个版本于 2019 年 11 月 13 日发布。

Nodejs 默认使用的是 CommonJS 语法，即`require`+`module.exports`或`exports`实现文件的引入和导出。

如果你想要在 Nodejs 中使用 ESM 的语法，需要手动修改`package.json`：

```json
{
  "type": "module",
  // 若你的这个包作为一个nodejs的包发布，给在ESM环境下的node程序调用，需要将main字段替换成module字段
  "module": "xxx.js"
}
```

经过上述配置之后，项目就变成了仅默认支持 ESM 的语法了。

在一个项目中，并不是说不能同时使用 ESM 和 CommonJS 语法，如果你确实有混用的需求，可以采取特殊的文件后缀的形式，对于 ESM，可以用`.mjs`作为后缀，对于 CommonJS 可以使用`.cjs`作为后缀。

在 CommonJS 环境下，提供了两个超有用的全局变量，`__filename`和`__dirname`，`__filename`表示当前执行的脚本的文件名，`__dirname`表示当前执行的脚本的路径。

这儿有一个比较坑人的点是这样的，`process.cwd()`（程序运行的路径）和`__dirname`这两者有很多人傻傻分不清，我也是爬过坑的，有些时候这两个变量得到的路径是一样的，有些时候又是不一样的。

怎么样来区分呢，假设我们现在有一个项目 A，A 下面有一个 lib 目录，A 下面还有一个 index.js，lib 目录里面假设有一个 b.js，假设 index.js 引用 b.js，

index.js

```js
// /Volumes/Development/Project/demo/docs/nodejs/demo
console.log(__dirname);
// /Volumes/Development/Project/demo/docs/nodejs/demo
console.log(process.cwd());
```

b.js

```js
// /Volumes/Development/Project/demo/docs/nodejs/demo/lib
console.log(process.cwd());
// /Volumes/Development/Project/demo/docs/nodejs/demo
console.log(__dirname);
```

这样，大家应该明白区别了吧。

在实际的开发中，这两个变量经常用到，比如我们在开发脚手架的时候（脚手架发布的时候一般来说都是全局安装的），我们想读取随包一起的资源文件，我们就可以使用

```js
const { resolve } = require("path");
const someAssetsPath = resolve(__dirname, "../assets/package.json.ejs");
```

如果在 ESM 中，就不能再使用`__filename`和`__dirname`了，此时 Nodejs 提供了一个新的环境变量`import.meta.url`

**实际开发中，明显可以感觉到使用`ESM`的语法要比`CommonJS`爽，因此，我们可以借助编译工具，比如`TS`或者`babel`，写的时候按照 ESM 的语法去书写（但是使用全局变量的时候按最终预期的语法的方式写，比如某个项目是 TS 编写，最终编译成 CommonJS，那么我们写代码的时候只能用`__dirname`和`__filename`）**

### 2、child_process 中的问题

在你使用`child_process`处理问题的时候，可能会遇到这样一个问题，比如我首先执行`cd /xxx/dir/demo`，然后再使用`child_process`执行新的命令，这两个进程是毫无关系的，这是需要明确的一个问题。

在我的例子，想锁定先进行 cd 操作，再执行程序，可以使用以下变通的办法。

```js
import execa from "execa";

async function test() {
  const subProjectDir = 'demo/lib'
  const { stdout: cwd } = await execa("pwd");
  process.chdir(subProjectDir);
  await execa("npx", args, {
    stdio: "inherit",
  });
  process.chdir(cwd);
}
```

其实这个问题很简单，还是因为我们对Nodejs的API不熟悉导致的。

### 3、devDependencies 和 dependencies 的问题

正常开发一个项目的时候，大家一般不会遇到这个问题，也不会去在意`--save-dev`还是`--save`了(因为只有某个包在本地了，构建工具找的到，就不会报错，谁又会在乎它的申明来源呢？)，只有在开发 Npm 包的时候才会考虑这个问题。

虽然看起来就是一个字面意思的问题，但是还是一个值得注意的问题。

假设你在开发一个脚手架，如果你的项目依赖的某个三方 npm 包，假设用户使用的时候是全局安装，那么你的这个 npm 包依赖一定是要写到`dependencies`里面的，否则全局安装的时候，node 不会安装这个依赖，程序运行的时候就会提示某个依赖包缺失的问题。

对于其它npm包也是这个道理（提供给用户使用，用户在安装的时候，npm会安装它的`dependencies`申明的依赖），所以说需要明确你的包的依赖，像如果某个功能，比如你用到了lodash,axios这种是肯定要写到`dependencies`的依赖的，但是如果是ts项目，你需要@types/axios的类型推导，这肯定将来运行的时候就不需要了，这类依赖只需要写到`devDependencies`即可。
