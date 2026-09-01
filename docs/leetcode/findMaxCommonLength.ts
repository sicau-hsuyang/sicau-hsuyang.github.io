export function findLength(nums1: number[], nums2: number[]): number {
  let dp: number[][] = Array.from({
    length: nums1.length + 1,
  }).map(() => {
    return Array.from({
      length: nums2.length + 1,
    }).fill(0);
  }) as number[][];
  let max = 0;
  for (let i = 1; i <= nums1.length; i++) {
    for (let j = 1; j <= nums2.length; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        // 前面的推导出来的，因此这儿是不需要再一直循环下去的，后面的内容会把前面的内容吸收了
        dp[i][j] = dp[i - 1][j - 1] + 1;
        max = Math.max(dp[i][j], max);
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return max;
}
