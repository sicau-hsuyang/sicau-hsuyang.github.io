// export function fourSum(nums: number[], target: number): number[][] {
//   // 先排序
//   nums.sort((a, b) => a - b);
//   let left = 0;
//   let right = nums.length - 1;
//   const results: number[][] = [];
//   while (left < right) {
//     let innerLeft = left + 1;
//     let innerRight = right - 1;
//     const sum = nums[left] + nums[right];
//     let accumulate!: number;
//     while (innerLeft < innerRight) {
//       accumulate = sum + nums[innerLeft] + nums[innerRight];
//       if (accumulate < target) {
//         innerLeft++;
//       } else if (accumulate > target) {
//         innerRight--;
//       } else {
//         // 相等，得到一个解
//         results.push([
//           nums[left],
//           nums[innerLeft],
//           nums[innerRight],
//           nums[right],
//         ]);
//         innerLeft++;
//         innerRight--;
//       }
//     }
//     // 如果一次循环都无法进入的话，说明已经没有任何可能找到解了
//     if (typeof accumulate === "undefined") {
//       break;
//     }
//     // 当停下来的时候的解目标和还小，说明这个解空间小了，应该在left的右边搜索解
//     if (accumulate < target) {
//       left++;
//     }
//     // 否则在right的左边搜索
//     else if (accumulate > target) {
//       right--;
//     }
//     // 相同的时候，同时递进
//     else {
//       // TODO: 两边动一个
//       left++;
//       right--;
//     }
//   }
//   return results;
// }

/**

[-2, -1, 0, 0, 1, 2]

[-2, -1, 1, 2]
[-2, 0, 0, 2]

[]

 */

export function fourSum(nums: number[], target: number): number[][] {
  // 先排序
  nums.sort((a, b) => a - b);
}
