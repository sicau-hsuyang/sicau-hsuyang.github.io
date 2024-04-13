import { numSubarrayBoundedMax } from "./numSubarrayBoundedMax";
// https://leetcode.cn/problems/number-of-subarrays-with-bounded-maximum/submissions/
describe("numSubarrayBoundedMax", () => {
  it("case 1", () => {
    const nums = [2, 1, 4, 3],
      left = 2,
      right = 3;
    const count = numSubarrayBoundedMax(nums, left, right);
    expect(count).toBe(3);
  });

  it("case 2", () => {
    const nums = [2, 9, 2, 5, 6],
      left = 2,
      right = 8;
    const count = numSubarrayBoundedMax(nums, left, right);
    expect(count).toBe(7);
  });

  it("case 3", () => {
    const nums: number[] = [],
      left = 1,
      right = 5000;
    for (let k = 5000; k >= 1; k--) {
      nums.push(k);
    }
    const now1 = new Date();
    const count = numSubarrayBoundedMax(nums, left, right);
    const now2 = new Date();
    console.log(now2.getTime() - now1.getTime());
    expect(count).toBe(12502500);
  });
});
