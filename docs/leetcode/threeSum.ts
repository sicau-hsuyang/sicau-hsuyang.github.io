// export function threeSum(nums: number[]): number[][] {
//   if (nums.length < 3) {
//     return [];
//   } else if (nums.length === 3) {
//     return nums[0] + nums[1] + nums[2] === 0 ? [nums] : [];
//   } else {
//     // 先排序
//     nums.sort((a, b) => a - b);
//     const res: number[][] = [];
//     const hash: Map<string, boolean> = new Map();
//     for (let i = 1; i < nums.length - 1; i++) {
//       let left = 0;
//       let right = nums.length - 1;
//       let sum = nums[left] + nums[i] + nums[right];
//       while (left < i && right > i) {
//         // 如果相等的场景，并且还不能再有这种情况
//         if (sum === 0) {
//           const val = [nums[left], nums[i], nums[right]];
//           val.sort((a, b) => a - b);
//           const key = val.join("|");
//           if (!hash.get(key)) {
//             hash.set(key, true);
//             res.push(val);
//           }
//           left++;
//           right--;
//           sum = nums[left] + nums[i] + nums[right];
//         }
//         // 说明负数太大了，应该尝试更小的负数
//         else if (sum < 0) {
//           left++;
//           sum = nums[left] + nums[i] + nums[right];
//         }
//         // 说明整数太大了，应该尝试更小的正数
//         else if (sum > 0) {
//           right--;
//           sum = nums[left] + nums[i] + nums[right];
//         }
//       }
//     }
//     return res;
//   }
// }

export function threeSum(nums: number[]): number[][] {
  const res: number[][] = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; ) {
    let start = i + 1;
    let end = nums.length - 1;
    let sum = nums[i] + nums[start] + nums[end];
    while (start < end) {
      let moveRight = false;
      let moveLeft = false;
      if (sum > 0) {
        moveRight = true;
      } else if (sum < 0) {
        moveLeft = true;
      } else {
        res.push([nums[i], nums[start], nums[end]]);
        moveLeft = true;
        moveRight = true;
      }
      if (moveLeft) {
        let offsetL = start + 1;
        while (nums[offsetL] === nums[start] && offsetL < end) {
          offsetL++;
        }
        start = offsetL;
      }
      if (moveRight) {
        let offsetR = end - 1;
        while (nums[offsetR] === nums[end] && offsetR > start) {
          offsetR--;
        }
        end = offsetR;
      }
      sum = nums[i] + nums[start] + nums[end];
    }
    let offset = i + 1;
    while (nums[offset] === nums[i] && offset < nums.length - 2) {
      offset++;
    }
    i = offset;
  }
  return res;
}
