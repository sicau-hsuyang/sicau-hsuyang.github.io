export function longestSubarray(nums: number[], limit: number): number {
  // let maxDistance = 0;
  // let left = 0;
  // const len = nums.length;
  // let windowMaxPos = 0;
  // let windowMinPos = 0;
  // for (let right = 1; right < len; right++) {
  //   const num = nums[right];
  //   // 求一个绝对值
  //   let minAbsDistance = Math.abs(nums[windowMinPos] - num);
  //   let maxAbsDistance = Math.abs(nums[windowMaxPos] - num);
  //   // 如果是因为最小的元素导致窗口溢出了，则丢弃最小的元素到这个位置
  //   if (minAbsDistance > limit) {
  //     left = windowMinPos + 1;
  //   }
  //   // 如果是因最大的元素导致窗口溢出了，则丢弃最大的元素到这个位置
  //   else if (maxAbsDistance > limit) {
  //     left = windowMaxPos + 1;
  //   }
  //   // 仍然在这个范围内，但是可能需要更新最大值的位置和最小值的位置
  //   else if (nums[windowMinPos] < num) {
  //     windowMinPos = right;
  //   } // 仍然在这个范围内，但是可能需要更新最大值的位置和最小值的位置
  //   else if (nums[windowMaxPos] > num) {
  //     windowMinPos = right;
  //   }
  // }
}
