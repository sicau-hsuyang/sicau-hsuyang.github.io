function map(arr, predicate) {
  const obj = Object(arr);
  const newArr = [];
  newArr.length = len;
  for (let i = 0; i < len; i++) {
    if (obj.hasOwnProperty(i)) {
      newArr[i] = predicate(obj[i], i, obj);
    }
  }
  return newArr;
}

// if (!Array.prototype.forEach) {
//   Array.prototype.forEach = function(callback, thisArg) {
//     // 1. 如果 this 值为 null 或 undefined，抛出 TypeError
//     if (this == null) {
//       throw new TypeError('Array.prototype.forEach called on null or undefined');
//     }

//     // 2. 将 this 值转换为对象（在这里是数组）
//     const O = Object(this);

//     // 3. 获取对象的长度属性（将其转换为整数）
//     const len = O.length >>> 0;

//     // 4. 如果回调函数不是一个函数，抛出 TypeError
//     if (typeof callback !== 'function') {
//       throw new TypeError(callback + ' is not a function');
//     }

//     // 5. 遍历数组
//     let k = 0;
//     while (k < len) {
//       // 6. 检查当前索引 k 是否在 O 的属性中
//       if (k in O) {
//         const kValue = O[k];

//         // 7. 调用回调函数，传入 thisArg，当前元素，索引，数组
//         callback.call(thisArg, kValue, k, O);
//       }
//       // 8. 递增 k
//       k++;
//     }

//     // 9. 不返回任何值（undefined）
//   };
// }


function forEach(arr, predicate) {
  const o = Object(arr);
  for (let i = 0; i < len; i++) {
    if (o.hasOwnProperty(i)) {
      predicate(obj[i], i, obj);
    }
  }
}
