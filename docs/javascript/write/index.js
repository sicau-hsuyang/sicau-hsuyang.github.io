/**
 * 判断一个对象o是否是ancestor的实例
 * @param {Object} o
 * @param {Object} ancestor
 */
function MyInstanceOf(o, ancestor) {
  // 左边参数必须是个引用类型
  if (!isRef(o)) {
    return false;
  }
  // 右边参数必须是个构造器
  if (!ancestor || typeof ancestor.prototype !== "object") {
    return false;
  }
  let proto = o.__proto__;
  // 循环终止的条件是找到头了也没有找到
  while (proto) {
    // 如果找到了可以直接返回结果
    if (proto === ancestor.prototype) {
      return true;
    }
    // 向上迭代
    proto = proto.__proto__;
  }
  return false;
}

/**
 * 判断o是否是引用类型
 * @param {Object} o
 * @returns
 */
function isRef(o) {
  return ["[object Object]", "[object Array]", "[object Function]"].includes(
    Object.prototype.toString.call(o)
  );
}

console.log(MyInstanceOf([], Array));

const o = {};

const parent = {};

Object.setPrototypeOf(o, parent);

console.log(MyInstanceOf(o, parent));

class A {}

class B extends A {}

class C extends B {}

const a = new A();

const c = new C();

console.log(MyInstanceOf(a, A));

console.log(MyInstanceOf(c, C));

console.log(MyInstanceOf(c, B));

console.log(MyInstanceOf(c, A));
