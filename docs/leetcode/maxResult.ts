// function move(
//   nums: number[],
//   k: number,
//   offset: number,
//   map: Map<number, number>
// ) {
//   // 如果已经跳到了外面
//   if (offset >= nums.length) {
//     return 0;
//   }
//   if (map.has(offset)) {
//     return map.get(offset)!;
//   }
//   let maxScore = -Infinity;
//   for (let i = offset; i < nums.length && i < offset + k; i++) {
//     const score = nums[i] + move(nums, k, i + 1, map);
//     if (score > maxScore) {
//       maxScore = score;
//     }
//   }
//   map.set(offset, maxScore);
//   return maxScore;
// }

// export function maxResult(nums: number[], k: number): number {
//   const map = new Map();
//   const res = nums[0] + move(nums, k, 1, map);
//   return res;
// }

// export function maxResult(nums: number[], k: number): number {
//   const dp: number[] = [];
//   let len = nums.length;
//   dp[len] = 0;
//   for (let offset = len - 1; offset >= 1; offset--) {
//     let maxScore = -Infinity;
//     for (let i = offset; i < len && i < offset + k; i++) {
//       const score = nums[i] + dp[i + 1];
//       if (score > maxScore) {
//         maxScore = score;
//       }
//     }
//     dp[offset] = maxScore;
//   }
//   return nums[0] + dp[1];
// }

export function maxResult(nums: number[], k: number): number {
  const n = nums.length;
  const dp: number[] = new Array(n).fill(0);
  dp[0] = nums[0];

  const deque: number[] = [0];

  for (let i = 1; i < n; i++) {
    // 移除不在窗口范围内的元素
    if (deque[0] < i - k) {
      deque.shift();
    }

    // 计算 dp[i]
    dp[i] = nums[i] + dp[deque[0]];

    // 移除所有比 dp[i] 小的元素
    while (deque.length > 0 && dp[i] >= dp[deque[deque.length - 1]]) {
      deque.pop();
    }

    // 将当前下标 i 加入队列
    deque.push(i);
  }

  return dp[n - 1];
}
