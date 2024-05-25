/**
 * 从数组片段start的位置开始到end位置取长度为K的最大子数组
 * @param start
 * @param end
 * @param k
 */
function findMaxK(arr: number[], start: number, end: number, k: number) {
  const len = end - start + 1;
  if (len < k) {
    return 0;
  }
  let sum = 0;
  for (let i = start; i < k + start; i++) {
    sum += arr[i];
  }
  let maxSum = sum;
  let left = start;
  for (let right = k + start; right <= end; right++) {
    const removeNum = arr[left];
    left++;
    const insertNum = arr[right];
    sum -= removeNum;
    sum += insertNum;
    if (sum > maxSum) {
      maxSum = sum;
    }
  }
  return maxSum;
}

export function maxSumTwoNoOverlap(
  nums: number[],
  firstLen: number,
  secondLen: number
): number {
  let maxSum1 = 0;
  for (let i = 0; i < firstLen; i++) {
    maxSum1 += nums[i];
  }

  let left = 0;
  let maxSum2 = findMaxK(nums, firstLen, nums.length - 1, secondLen);
  let maxTotalSum = maxSum1 + maxSum2;

  for (let right = firstLen; right < nums.length; right++) {
    const removeNum = nums[left];
    left++;
    const insertNum = nums[right];
    maxSum1 -= removeNum;
    maxSum1 += insertNum;
    const leftSubMaxSum = findMaxK(nums, 0, left - 1, secondLen);
    const rightSubMaxSum = findMaxK(
      nums,
      right + 1,
      nums.length - 1,
      secondLen
    );
    maxSum2 = Math.max(leftSubMaxSum, rightSubMaxSum);
    const totalSum = maxSum1 + maxSum2;
    if (totalSum > maxTotalSum) {
      console.log(maxSum1, maxSum2);
      maxTotalSum = totalSum;
    }
  }
  return maxTotalSum;
}
