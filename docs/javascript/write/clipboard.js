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
    tmpInput.select();
    typeof document.execCommand === "function" && document.execCommand("copy");
    document.body.removeChild(tmpInput);
  }
}

async function copyImage() {
  const resp = await fetch(
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13957501653%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674800933&t=24fb7e5025b7536c22e20ddb243e9f65"
  );
  const blob = await resp.blob();
  const copyContent = new ClipboardItem({
    "image/png": blob,
  });
  navigator.clipboard.write([copyContent]);
}
