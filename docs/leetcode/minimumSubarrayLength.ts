function calc(nums: number[]) {
  return nums.reduce((sum, num) => {
    return sum | num;
  }, nums[0]);
}

export function minimumSubarrayLength(nums: number[], k: number): number {
  for (let i = 1; i <= 50; i++) {
    const digits: number[] = [];
    for (let o = 0; o < i; o++) {
      const num = nums[o];
      digits.push(num);
    }
    const val = calc(digits);
    if (val >= k) {
      return digits.length;
    }
    for (let j = i; j < nums.length; j++) {
      const num = nums[j];
      digits.shift();
      digits.push(num);
      const val = calc(digits);
      if (val >= k) {
        return digits.length;
      }
    }
  }
  return -1;
}
