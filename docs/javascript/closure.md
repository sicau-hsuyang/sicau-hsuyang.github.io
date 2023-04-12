## 闭包

```js
const test = 2;
const o = (function () {
  const obj = {
    a: 1,
    b: 2,
  };
  return {
    get(prop) {
      return obj[prop];
    },
  };
})();

// Object.defineProperty(Object.prototype, "abc", {
//   get() {
//     return this;
//   },
// });

// const obj = o.get("abc");

// delete obj.a;

// delete obj.b;

// console.log(o.get("a"));
```
