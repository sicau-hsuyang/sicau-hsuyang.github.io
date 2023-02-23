function MyNew(func, ...args) {
  if (!func || typeof func.prototype?.constructor !== "function") {
    throw new Error("the MyNew must be called by a constructor");
  }
  // 创建一个空对象
  const o = {};
  // 将当前空对象的原型挂载在构造函数的原型对象上
  o.__proto__ = func.prototype;
  // 以当前空对象为上下文执行构造函数
  const results = func.apply(o, args);
  // 如果构造函数返回的类型是引用类型，返回构造函数返回的结果，否则返回这个创建的对象
  return typeof results === "object" && results !== null ? results : o;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Joker(name, age) {
  this.name = name;
  this.age = age;
  return {};
}

function Twister(name, age) {
  this.name = name;
  this.age = age;
  return null;
}

const p1 = MyNew(Person, "Bill Gates", 80);
const p2 = MyNew(Joker, "Trump", 90);
const p3 = MyNew(Twister, "Zelensky", 60);
console.log(p1);
console.log(p1 instanceof Person);
console.log(p2);
console.log(p3);