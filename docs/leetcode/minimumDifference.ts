export function minimumDifference(nums: number[], k: number): number {
  if (k === 1) {
    return 0;
  }
  // 先对数组进行排序
  nums.sort((a, b) => {
    return a - b;
  });
  let left = 0;
  let minScore = nums[left];
  let maxScore = nums[k - 1];
  let minDistance = maxScore - minScore;
  for (let i = k; i < nums.length; i++) {
    maxScore = nums[i];
    minScore = nums[++left];
    // console.log(maxScore, minScore)
    let D = maxScore - minScore;
    if (minDistance > D) {
      minDistance = D;
    }
  }
  return minDistance;
}
