## 复制内容到剪贴板

以下是一个不用借助任何第三方库也几乎不用考虑兼容性的复制内容到剪贴板的实现。

```js
/**
 * 向Clipboard写入内容
 * @param {string} content 写入剪贴板的内容
 */
async function setClipboardText(content) {
  try {
    await navigator.clipboard.writeText(content);
  } catch (exp) {
    const tmpInput = document.createElement("input");
    document.body.appendChild(tmpInput);
    tmpInput.value = content;
    /* 需要让这个input是可见的，不能将其设置为visibility为hidden或者display为none */
    tmpInput.style.left = "absolute";
    tmpInput.style.left = "10000px";
    tmpInput.style.top = "10000px";
    tmpInput.select();
    typeof document.execCommand === "function" && document.execCommand("copy");
    document.body.removeChild(tmpInput);
  }
}
```

`HTML5`新增了一个比较有趣的`API`，叫做`ClipboardItem`，以下是它的兼容性情况，还不算太好。

<div align="center">
  <img :src="$withBase('/javascript/snippets/copy-into-clipboard/clip-item.png')" alt='兼容性'/>
</div>

可以使用它复制图片，不过图片只能是`png`格式的。

以下是一段复制图片到剪贴板的代码片段：（注意，需要在网页里面执行，否则会抛出`DOMException: Document is not focused.`这个错误）

```js
async function copyImage() {
  const resp = await fetch(
    "https://res.cdn.changbaimg.com/asset/yunying/gold-rabbit-bless/mask-layer.bcc76a5e.png"
  );
  const blob = await resp.blob();
  const copyContent = new ClipboardItem({
    "image/png": blob,
  });
  navigator.clipboard.write([copyContent]);
}
```
