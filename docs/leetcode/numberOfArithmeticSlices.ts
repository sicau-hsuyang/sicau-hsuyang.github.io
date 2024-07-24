// interface Struct {
//   start: number;
//   last: number;
//   diff: number;
// }

// export function numberOfArithmeticSlices(nums: number[]): number {
//   if (nums.length <= 2) {
//     return 0;
//   }

//   let count = 0;

//   function calculator(nums: number[], offset = 0, map: Map<number, Struct>) {
//     if (map.has(offset)) {
//       return map.get(offset)!;
//     }
//     if (offset === 1) {
//       return {
//         start: 0,
//         last: nums[offset],
//         diff: nums[offset] - nums[offset - 1],
//       };
//     } else {
//       const prevRes = calculator(nums, offset - 1, map);
//       const cur = nums[offset];
//       let start: number;
//       let diff: number = prevRes.diff;
//       // 相等
//       if (cur - prevRes.last === prevRes.diff) {
//         let len = offset - prevRes.start + 1;
//         let size = len - 2;
//         count += size;
//         start = prevRes.start;
//       } else {
//         start = offset - 1;
//         diff = cur - prevRes.last;
//       }
//       const res = {
//         start,
//         last: cur,
//         diff,
//       };
//       map.set(offset, res);
//       return res;
//     }
//   }
//   calculator(nums, nums.length - 1, new Map());

//   return count;
// }

interface Struct {
  start: number;
  last: number;
  diff: number;
}

export function numberOfArithmeticSlices(nums: number[]): number {
  if (nums.length <= 2) {
    return 0;
  }

  let count = 0;

  function calculator(nums: number[]) {
    const dp: Struct[] = [];
    dp[1] = {
      start: 0,
      last: nums[1],
      diff: nums[1] - nums[0],
    };
    for (let i = 2; i < nums.length; i++) {
      const prevRes = dp[i - 1];
      const cur = nums[i];
      let start: number;
      let diff: number = prevRes.diff;
      // 相等
      if (cur - prevRes.last === prevRes.diff) {
        let len = i - prevRes.start + 1;
        let size = len - 2;
        count += size;
        start = prevRes.start;
      } else {
        start = i - 1;
        diff = cur - prevRes.last;
      }
      dp[i] = {
        start,
        last: cur,
        diff,
      };
    }
  }

  calculator(nums);

  return count;
}
