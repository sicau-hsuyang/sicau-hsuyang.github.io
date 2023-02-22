/**
 * 判断一个数据的类型
 * @param {any} o
 * @returns
 */
function getType(o) {
  if (o === null) {
    return "null";
  } else if (typeof o === "object") {
    return Array.isArray(o) ? "array" : "object";
  } else {
    return typeof o;
  }
}
