// export function threeSum(nums: number[]): number[][] {
//   // 先排序
//   nums.sort((a, b) => a - b);
//   const res: number[][] = [];
//   const zeroIdx = nums.findIndex((v) => v === 0);
//   const absMap = new Map();
//   // 处理有0的case
//   if (zeroIdx >= 0) {
//     let start = 0;
//     let end = nums.length - 1;
//     while (nums[start] * nums[end] <= 0 && start <= end) {
//       // 如果相等
//       if (nums[start] + nums[end] === 0) {
//         if (!absMap.get(nums[end]) && end - start >= 2) {
//           res.push([nums[start], 0, nums[end]]);
//           // 设置值的引用
//           absMap.set(nums[end], true);
//         }
//         // 处理成功一个结果
//         start++;
//         end--;
//       }
//       // 负数大
//       else if (nums[start] + nums[end] < 0) {
//         start++;
//       } else if (nums[start] + nums[end] > 0) {
//         end--;
//       }
//     }
//   }
//   // 处理不带有0的case
//   let start = 0;
//   let end = nums.length - 1;
//   let map1 = new Map();
//   let map2 = new Map();
//   // 负负+正
//   // 正正+负
//   while (nums[start] * nums[end] < 0) {
//     // 负负正
//     if (
//       nums[start] + nums[start + 1] + nums[end] === 0 &&
//       Math.abs(nums[start + 1]) != 0
//     ) {
//       // 没有加过才加，加过仅仅跳过
//       if (!map1.get(nums[start])) {
//         res.push([nums[start], nums[start + 1], nums[end]]);
//         map1.set(nums[start], true);
//       }
//       start += 2;
//       end--;
//     }
//     // 正正负
//     else if (
//       nums[start] + nums[end - 1] + nums[end] === 0 &&
//       Math.abs(nums[end - 1]) != 0
//     ) {
//       // 没有加过才加，加过仅仅跳过
//       if (!map2.get(nums[end])) {
//         res.push([nums[start], nums[end - 1], nums[end]]);
//         map2.set(nums[end], true);
//       }
//       end -= 2;
//       start++;
//     } else if (
//       nums[start] + nums[end - 1] + nums[end] < 0 ||
//       nums[start] + nums[start + 1] + nums[end] < 0
//     ) {
//       start++;
//     } else if (
//       nums[start] + nums[end - 1] + nums[end] > 0 ||
//       nums[start] + nums[start + 1] + nums[end] > 0
//     ) {
//       end--;
//     } else {
//       start++;
//       end--;
//     }
//   }
//   return res;
// }

export function threeSum(nums: number[]): number[][] {
  // 先排序
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  let start = 0;
  let end = nums.length - 1;
  while (nums[start] * nums[end] <= 0) {
    let start1 = start + 1;
    let end1 = end - 1;
  }
}
