// export function canJump(nums: number[]): boolean {
//   return jump(nums);
// }

// function jump(
//   nums: number[],
//   offset = 0,
//   map: Map<number, boolean> = new Map()
// ) {
//   if (nums.length - 1 <= offset) {
//     return true;
//   }
//   console.log(nums.slice(offset))
//   const step = nums[offset];
//   for (let i = step; i >= 1; i--) {
//     const next = offset + i;
//     const flag = map.get(next);
//     if (typeof flag !== "undefined") {
//       if (flag) {
//         return true;
//       } else {
//         continue;
//       }
//     } else {
//       const tryFlag = jump(nums, next, map);
//       map.set(next, tryFlag);
//       if (tryFlag) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

// export function canJump(
//   nums: number[],
//   offset: number = 0,
//   dp: boolean[] = []
// ): boolean {
//   let step = nums[offset];
//   if (offset + step >= nums.length - 1) {
//     return true;
//   }
//   let canReach = false;
//   for (let i = 1; i <= step; i++) {
//     if (canJump(nums, offset + i, dp)) {
//       canReach = true;
//       break;
//     }
//   }
//   dp[offset] = canReach;
//   return canReach;
// }

export function canJump(nums: number[]): boolean {
  const dp: number[] = [];
  dp[nums.length - 1] = 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    let step = nums[i];
    let canReach = 0;
    for (let k = 1; k <= step && i + k < nums.length; k++) {
      if (dp[i + k] === 1) {
        canReach = 1;
        break;
      }
    }
    dp[i] = canReach;
  }
  return dp[0] === 1;
}
