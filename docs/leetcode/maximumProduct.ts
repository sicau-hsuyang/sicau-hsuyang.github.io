export function maximumProduct(nums: number[]): number {
  // 将最小的两个元素替换到头部的两个
  for (let i = 0; i < 2; i++) {
    let flag = false;
    for (let k = nums.length - 1; k > i; k--) {
      if (nums[k] < nums[k - 1]) {
        let temp = nums[k];
        nums[k] = nums[k - 1];
        nums[k - 1] = temp;
        flag = true;
      }
    }
    if (!flag) {
      break;
    }
  }
  // 将最大的三个元素替换到尾部的3个
  for (let i = 0; i < 3; i++) {
    let flag = false;
    for (let k = 2; k < nums.length - i; k++) {
      if (nums[k] < nums[k - 1]) {
        let temp = nums[k];
        nums[k] = nums[k - 1];
        nums[k - 1] = temp;
        flag = true;
      }
    }
    if (!flag) {
      break;
    }
  }
  // 最小的两个
  let combine1 = nums[0] * nums[1] * nums[nums.length - 1];
  let combine2 =
    nums[nums.length - 3] * nums[nums.length - 2] * nums[nums.length - 1];
  return Math.max(combine1, combine2);
}

/**

两个最大的负数 加上最大的正数

三个最大的正数

 */
