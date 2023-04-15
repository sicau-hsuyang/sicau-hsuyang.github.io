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

function demo1() {
  console.log("demo1");
  demo1();
}

function demo2() {
  console.log("demo2");
  setTimeout(() => {
    demo2();
  }, 0);
}
