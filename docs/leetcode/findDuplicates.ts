export function findDuplicates(nums: number[]): number[] {
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const tmp = Math.abs(num);
    // 第二次出现
    if (nums[tmp - 1] < 0) {
      res.push(tmp);
    }
    nums[tmp - 1] *= -1;
  }
  return res;
}
