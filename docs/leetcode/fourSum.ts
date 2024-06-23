/**

[-2, -1, 0, 0, 1, 2]

[-2, -1, 1, 2]
[-2, 0, 0, 2]

[]

 */

export function fourSum(nums: number[], target: number): number[][] {
  const results: number[][] = [];
  // 如果元素的长度不足4个，肯定是没有任何可能凑成解的
  if (nums.length < 4) {
    return results;
  }
  // 先排序
  nums.sort((a, b) => a - b);
  let len = nums.length;
  let left = 0;
  let right = len - 1;
  let tempLeft = left;
  let tempRight = right;
  while (left + 1 < right - 1) {
    // 单独计算左边的情况
    let outerLeftVal: number;
    let innerLeft: number;
    // 单独计算右边的情况
    let outerRightVal: number;
    let innerRight: number;
    if (tempLeft !== left && tempRight === right) {
      outerLeftVal = nums[tempLeft];
      innerLeft = tempLeft + 1;
    } else {
      outerLeftVal = nums[left];
      innerLeft = left + 1;
    }
    if (tempLeft !== left && tempRight !== right) {
      outerRightVal = nums[tempRight];
      innerRight = tempRight - 1;
    } else {
      outerRightVal = nums[right];
      innerRight = right - 1;
    }
    let outSum = outerLeftVal + outerRightVal;
    let innerLeftVal = nums[innerLeft];
    let innerRightVal = nums[innerRight];
    let tempSum = outSum + innerLeftVal + innerRightVal;
    while (innerLeft < innerRight) {
      if (tempSum === target) {
        results.push([
          outerLeftVal,
          innerLeftVal,
          innerRightVal,
          outerRightVal,
        ]);
        // 在这种状态下，随便写，左指针右移跟右指针左移都可以，因为这样才不会漏解，我用的是右指针左移
        let offset = innerRight - 1;
        // 向后找不重复的元素
        while (innerLeft < offset && nums[offset] === nums[innerRight]) {
          offset--;
        }
        innerRight = offset;
        innerRightVal = nums[innerRight];
        tempSum = outSum + innerLeftVal + innerRightVal;
      } else if (tempSum < target) {
        let offset = innerLeft + 1;
        // 向后找不重复的元素
        while (offset < innerRight && nums[offset] === nums[innerLeft]) {
          offset++;
        }
        innerLeft = offset;
        innerLeftVal = nums[innerLeft];
        tempSum = outSum + innerLeftVal + innerRightVal;
      } else if (tempSum > target) {
        let offset = innerRight - 1;
        // 向后找不重复的元素
        while (innerLeft < offset && nums[offset] === nums[innerRight]) {
          offset--;
        }
        innerRight = offset;
        innerRightVal = nums[innerRight];
        tempSum = outSum + innerLeftVal + innerRightVal;
      }
    }
    // 先尝试左边移动
    if (tempLeft === left) {
      let offset = left + 1;
      // 向后找不重复的元素
      while (offset < right - 1 && nums[offset] === nums[left]) {
        offset++;
      }
      tempLeft = offset;
    }
    // 再尝试右边移动
    else if (tempLeft !== left && tempRight === right) {
      let offset = right - 1;
      // 向后找不重复的元素
      while (left + 1 < offset && nums[offset] === nums[right]) {
        offset--;
      }
      tempRight = offset;
    } else {
      left = tempLeft;
      right = tempRight;
    }
  }
  return results;
}
