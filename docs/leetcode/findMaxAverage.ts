export function findMaxAverage(nums: number[], k: number): number {
  // 先求出来一个sum和最大平均值
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  let maxAvg = sum / k;
  for (let i = 1; i <= nums.length - k; i++) {
    sum -= nums[i - 1];
    sum += nums[i + k - 1];
    let tempAvg = sum / k;
    if (tempAvg > maxAvg) {
      maxAvg = tempAvg;
    }
  }
  return maxAvg;
}
