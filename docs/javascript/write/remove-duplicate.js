// /**
//  * 有序数组去重
//  * @param {number[]} arr1
//  * @param {number[]} arr2
//  */
// function removeDuplicate(arr1, arr2) {
//   let offset1 = 0;
//   let offset2 = 0;
//   const result = [];
//   while (offset1 < arr1.length && offset2 < arr2.length) {
//     let v1 = arr1[offset1];
//     let v2 = arr2[offset2];
//     if (v1 === v2) {
//       result.push(v1);
//       offset1++;
//       offset2++;
//     } else if (v1 < v2) {
//       result.push(v1);
//       offset1++;
//     } else if (v2 < v1) {
//       result.push(v2);
//       offset2++;
//     }
//   }
//   while (offset1 < arr1.length) {
//     result.push(arr1[offset1++]);
//   }
//   while (offset2 < arr2.length) {
//     result.push(arr2[offset2++]);
//   }
//   return result;
// }

// const res1 = removeRepeat([1, 2, 3], [3]);

// const res2 = removeRepeat([1, 2, 3], [3, 4, 5]);

// const res3 = removeRepeat([3], [3, 4, 5, 8]);

// const res4 = removeRepeat([-1, 2], [3, 4, 5, 8]);

// console.log(res1, res2, res3, res4);

// /**
//  * 数组去重
//  * @param {number[]} arr 待去重数组
//  * @returns
//  */
// function removeDuplicate(arr) {
//   const dataSets = [];
//   for (let i = 0; i < arr.length; i++) {
//     const num = arr[i];
//     // 在结果集中查找是否存在
//     if (dataSets.every((v) => v !== num)) {
//       dataSets.push(num);
//     }
//   }
//   return dataSets;
// }

/**
 * 数组去重
 * @param {number[]} arr 待去重数组
 * @returns
 */
function removeDuplicate(arr) {
  // 本质上和两重for循环是一样的意思
  return arr.filter((v, idx) => {
    // 过滤依据是，如果当前元素第一次出现的索引和它在数组中的索引匹配的上，说明它只有一个
    return arr.indexOf(v) === idx;
  });
}

// /**
//  * 数组去重
//  * @param {number[]} arr 待去重数组
//  * @returns
//  */
// function removeDuplicate(arr) {
//   return [...new Set(arr)];
// }

// /**
//  * 合并两个有序数组新数组，仍然有序并去重
//  * @param {number[]} arr1
//  * @param {number[]} arr2
//  */
// function removeDuplicate(arr1, arr2) {
//   let offset1 = 0;
//   let offset2 = 0;
//   const result = [];
//   //如果有一个数组已经合并完成了的话，循环退出
//   while (offset1 < arr1.length && offset2 < arr2.length) {
//     // 分别从两个数组中取出
//     let v1 = arr1[offset1];
//     let v2 = arr2[offset2];
//     //值相等的时候合并一个就好
//     if (v1 === v2) {
//       result.push(v1), offset1++, offset2++;
//     } else if (v1 < v2) {
//       // 合并小的值
//       result.push(v1);
//       offset1++;
//     } else if (v2 < v1) {
//       // 合并小的值
//       result.push(v2);
//       offset2++;
//     }
//   }
//   // 在上述循环退出来以后，有3种情况，有可能两个数组都合并完了，有可能数组1还没有合并完，也有可能数组2还没有合并完，
//   // 也就是说以下两个while循环不可能同时成立，至多执行1个
//   while (offset1 < arr1.length) {
//     result.push(arr1[offset1++]);
//   }
//   while (offset2 < arr2.length) {
//     result.push(arr2[offset2++]);
//   }
//   return result;
// }

/**
 * 数组去重
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
function removeDuplicate(arr1, arr2) {
  const map = new Map();
  // 将没有在哈希表中出现过的元素加入到哈希表中
  for (let i = 0; i < arr1.length; i++) {
    const num = arr1[i];
    map.set(num, 1);
  }
  // 遍历另外一个数组，如果哈希表中还没有，加入，否则跳过
  for (let i = 0; i < arr2.length; i++) {
    const num = arr2[i];
    map.set(num, 1);
  }
  //以哈希表的键的集合作为结果集，就是不重复的元素，map.keys()得到的是一个Iterator，使用扩展运算符可以将其变成一个真的数组
  return [...map.keys()];
}
