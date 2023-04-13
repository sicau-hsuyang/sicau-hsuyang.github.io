/**
 * 使用深度优先深克隆对象
 * @param {Array<any> | object} obj
 * @param { Map<Array<any> | object, Array<any> | object> } map
 * @returns
 */
export function deepClone(obj: object | any[], map = new Map()) {
  // 如果已经拷贝过，则可以直接返回拷贝过的值，主要是为了防止循环引用
  let cloneObj = map.get(obj);
  if (typeof cloneObj !== "undefined") {
    return cloneObj;
  }
  // 初始化拷贝的对象
  cloneObj = Array.isArray(obj) ? [] : {};
  // 建立已经拷贝的引用，不能再开始拷贝属性了再建立拷贝引用，否则将会导致递归最大调用栈的问题发生
  map.set(obj, cloneObj);
  // 对拷贝对象挨个赋值
  for (let prop in obj) {
    // 遇到对象，则递归拷贝
    if (obj[prop] instanceof Object) {
      cloneObj[prop] = deepClone(obj[prop], map);
      // 拷贝完成后，还要将其加入引用Map中去
      map.set(obj[prop], cloneObj[prop]);
    } else {
      cloneObj[prop] = obj[prop];
    }
  }
  return cloneObj;
}
