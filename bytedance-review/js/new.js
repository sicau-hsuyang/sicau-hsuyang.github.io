function myNew(fn, ...args) {
  const obj = {};
  const res = fn.apply(obj, args);
  obj.__proto__ = fn.prototype;
  return typeof res === "object" && res !== null ? res : obj;
}

function Person(a, b) {
  this.aaa = a;
  this.bbb = b;
}

const ob1 = myNew(Person, "yangxu", "jiang");
const ob2 = new Person("yangxu", "jiang");
