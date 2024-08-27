// function cloneDeep(obj, map = new Map()) {
//   // 如果已经拷贝过的话，直接给，防止循环引用
//   const copied = map.get(obj);
//   if (copied) {
//     return copied;
//   }
//   // 基本类型
//   if (obj === null || typeof obj !== "object") {
//     return obj;
//   }
//   const newObj = Array.isArray(obj) ? [] : {};
//   map.set(obj, newObj);
//   for (const prop in obj) {
//     // 对象，递归拷贝
//     if (typeof obj === "object" && obj !== null) {
//       const clonedPbj = cloneDeep(obj[prop], map);
//       newObj[prop] = clonedPbj;
//     } else {
//       newObj[prop] = obj[prop];
//     }
//   }
//   return newObj;
// }

// // const res = cloneDeep({ a: { b: [{ ddd: 1 }] } });
// // console.log(res);

// const a = { a: { b: [{ ddd: 1 }] } };

// const b = {
//   x: {
//     y: {
//       c: [
//         {
//           z: [],
//         },
//       ],
//     },
//   },
// };

// b.x.y.c[0].z.push(a);

// a.a.b.push(b);

// const res1 = cloneDeep(a);
// console.log(res1);

function cloneDeep(obj) {
  const map = new Map();
  const targetCopied = Array.isArray(obj) ? [] : {};
  const queue = [
    {
      source: obj,
      target: targetCopied,
    },
  ];
  map.set(obj, targetCopied);

  while (queue.length) {
    const { source, target } = queue.shift();
    for (let prop in source) {
      if (source[prop] === null || typeof source[prop] !== "object") {
        target[prop] = source[prop];
      } else {
        let copied = map.get(source[prop]);
        if (copied) {
          target[prop] = copied;
        } else {
          copied = Array.isArray(source[prop]) ? [] : {};
          target[prop] = copied;
          map.set(target[prop], copied);
          queue.push({
            source: source[prop],
            target: copied,
          });
        }
      }
    }
  }
  return targetCopied;
}

// const res = cloneDeep({ a: { b: [{ ddd: 1 }] } });
// console.log(res);


const a = { a: { b: [{ ddd: 1 }] } };

const b = {
  x: {
    y: {
      c: [
        {
          z: [],
        },
      ],
    },
  },
};

b.x.y.c[0].z.push(a);

a.a.b.push(b);

const res1 = cloneDeep(a);
console.log(res1);
