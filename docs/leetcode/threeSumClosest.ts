export function threeSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => {
    return a - b;
  });
  let len = nums.length;
  // 1代表正数，也就是目标和比target大，-1代表负数，也就是目标和比target小
  let direction = 0;
  let minDistance = Infinity;
  let distSum: number;
  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
    }
  }
  return distSum;
}

/**
 【-4， -1， 1， 2】
 */
