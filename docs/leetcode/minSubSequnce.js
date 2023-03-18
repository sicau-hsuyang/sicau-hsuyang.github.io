/**
 * 求满足和大于等于target的最小连续子数组
 * @param {number} target 目标值
 * @param {number[]} arr 原数组
 */
function minSubArrayLen(target, arr) {
  // 定义最小长度为无限长
  let minLength = Infinity;
  // 定义起始位置
  let left = 0;
  let sum = 0;
  for (let right = 0; right < arr.length; right++) {
    // 当前的位置累加
    sum += arr[right];
    // 如果发现已经有可能满足的条件，开始滑动
    while (sum >= target) {
      // 以left到end的距离参与判断
      let subLength = right - left + 1;
      // 如果发现这段距离可以得到更小的距离，更新距离
      if (subLength < minLength) {
        minLength = subLength;
      }
      // 左指针向后移动一位，同时sum也要减去相应的值
      sum -= arr[left++];
    }
  }
  // 如果上述条件一次都没有更新过的话，说明不存在条件，返回0
  return Number.isFinite(minLength) ? minLength : 0;
}

const nums = [2, 3, 1, 2, 4, 3],
  target = 7;

// const target = 4, nums = [1,4,4]
// const target = 11,
//   nums = [1, 1, 1, 1, 1, 1, 1, 1];

const res = minSubArrayLen(target, nums);
console.log(res);
