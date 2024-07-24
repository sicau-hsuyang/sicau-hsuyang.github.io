// export function combinationSum4(nums: number[], target: number): number[][] {
//   const res: number[][] = [];
//   for (let i = 0; i < nums.length && nums[i] <= target; i++) {
//     const next = target - nums[i];
//     if (next > 0) {
//       const nextRes = combinationSum4(nums, next);
//       nextRes.forEach((arr) => {
//         res.push([nums[i], ...arr]);
//       });
//     } else if (next === 0) {
//       res.push([nums[i]]);
//     }
//   }
//   return res;
// }

// function _combinationSum4(
//   nums: number[],
//   target: number,
//   map: Map<number, number>
// ): number {
//   if (map.has(target)) {
//     return map.get(target)!;
//   }
//   let total = 0;
//   for (let i = 0; i < nums.length && nums[i] <= target; i++) {
//     const next = target - nums[i];
//     if (next > 0) {
//       const count = _combinationSum4(nums, next, map);
//       total += count;
//     } else if (next === 0) {
//       total++;
//     }
//   }
//   map.set(target, total);
//   return total;
// }

// export function combinationSum4(nums: number[], target: number) {
//   nums.sort((a, b) => a - b);
//   return _combinationSum4(nums, target, new Map());
// }

function _combinationSum4(nums: number[], target: number): number {
  const dp: number[] = Array.from({
    length: target + 1,
  }).fill(0) as number[];
  dp[0] = 1;
  // 初始化
  dp[nums[0]] = 1;
  for (let money = nums[0]; money <= target; money++) {
    let total = 0;
    for (let i = 0; i < nums.length && nums[i] <= money; i++) {
      const next = money - nums[i];
      if (next >= 0) {
        total += dp[next];
      }
      // else if (next === 0) {
      //   total++;
      // }
    }
    dp[money] = total;
  }
  return dp[target];
}

export function combinationSum4(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  return _combinationSum4(nums, target);
}

/**
 4 = 1 + 3
 4 = 1 + 1 + 2
 4 = 1 + 1 + 1 + 1
 */
