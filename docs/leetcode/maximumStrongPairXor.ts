export function maximumStrongPairXor(nums: number[]): number {
  let maxVal = 0;
  for (let i = 0; i < nums.length; i++) {
    const num1 = nums[i];
    for (let j = 0; j < nums.length; j++) {
      const num2 = nums[j];
      const val = num1 ^ num2;
      const abs = Math.abs(num1 - num2);
      const min = Math.min(num1, num2);
      if (min >= abs && val > maxVal) {
        maxVal = val;
      }
    }
  }
  return maxVal;
}
