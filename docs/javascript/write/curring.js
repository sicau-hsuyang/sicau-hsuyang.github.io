// function curring(fn) {
//   return _curring(fn, fn.length);
// }

// function _curring(fn, length, ...args) {
//   return function (...params) {
//     const _args = [...args, ...params];
//     if (_args.length >= length) {
//       return fn.apply(this, _args);
//     } else {
//       return _curring(fn, length, ..._args);
//     }
//   };
// }

// const add = function (a, b, c, d, e) {
//   return a + b + c + d + e;
// };

// const curringAdd = curring(add);

// const res = curringAdd(1)(2)(3)(4)(5);

// function checkByRegExp(regExp, string) {
//   return regExp.test(string);
// }

// const curringCheck = curring(checkByRegExp);

// const checkPhone = curringCheck(/^1\d{10}$/);

// const res1 = checkPhone("15184406d336");
// console.log(res1);

function _add(a, b, c, d) {
  return a + b + c + d;
}

function currying(fn, ...outerArgs) {
  // 获取函数的参数长度
  const length = fn.length;
  return function () {
    const innerArgs = Array.from(arguments);
    const combinedArgs = [...outerArgs, ...innerArgs];
    // 如果达到了函数最终的参数个数
    if (combinedArgs.length === length) {
      return fn.apply(this, combinedArgs);
    } else {
      return currying(fn, ...combinedArgs);
    }
  };
}

const add = currying(_add);

const res = add(1)(2)(3)(4); // 10

console.log(res);
