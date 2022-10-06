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
