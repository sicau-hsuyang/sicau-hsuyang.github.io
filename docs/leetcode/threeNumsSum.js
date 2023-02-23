/**
 *
 * @param {number[]} arr
 */
function threeSum(arr) {
  const map = new Map();
  arr.forEach((v) => {
    if (map.get(v)) {
      map.set(map.get(v) + 1);
    } else {
      map.set(1);
    }
  });
  const results = [];
  const recordMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    const digit = arr[i];
    // 如果当前已经处理过，跳过
    if (recordMap.get(digit)) {
      continue;
    }
    // 分别记录使用当前数字1次，2次，3次的结果
    const record = {
      3: null,
      2: null,
      1: [],
    };
    // 3数为0
    if (digit === 0) {
      results.push([0, 0, 0]);
      record[3] = [[0, 0, 0]];
    } else if (map.get(digit * -2)) {
      // 两个数相同，并且三数相加为0
      results.push([digit, digit, digit * -2]);
      record[2] = {
        2: digit,
        1: digit * -2,
      };
    } else {
      // 找出剩下的两数之和为当前数字的相反数的所有结果
      const sub = twoSum(arr, 0 - digit, map);
      for (let k = 0; k < sub.length; k++) {
        // 当前子集
        const cur = sub[k];
        // 两个数相同的情况下，看看有没有重复统计
        // TODO: 做复杂了
        if (cur[0] === digit) {
          const val = recordMap.get(cur[1]);
          // 如果刚好跟另外一个数的ABB冲突
          if (val && val[2] && val[2][2] === digit) {
            continue;
          } else {
            results.push([digit, ...sub]);
            record[1].push([digit, ...sub]);
          }
        } else if (cur[1] === digit) {
          const val = recordMap.get(cur[0]);
          // 如果刚好跟另外一个数的ABB冲突
          if (val && val[2] && val[2][2] === digit) {
            continue;
          } else {
            results.push([digit, ...sub]);
            record[1].push([digit, ...sub]);
          }
        } else {
          results.push([digit, ...sub]);
          record[1].push([digit, ...sub]);
        }
      }
    }
    recordMap.set(digit, record);
  }
}

/**
 * 两数之和
 * @param {number[]} arr
 * @param {number} sum
 * @param {Map<number, number>} map
 * @returns
 */
function twoSum(arr, sum, map) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const digit = arr[i];
    const target = sum - digit;
    if (map[target] && digit != 0) {
      res.push([digit, target]);
    }
  }
  return res;
}
