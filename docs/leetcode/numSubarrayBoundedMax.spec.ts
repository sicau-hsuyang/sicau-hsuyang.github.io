import { numSubarrayBoundedMax } from "./numSubarrayBoundedMax";

describe("numSubarrayBoundedMax", () => {
  it("case 1", () => {
    const nums = [2, 1, 4, 3],
      left = 2,
      right = 3;
    const count = numSubarrayBoundedMax(nums, left, right);
    expect(count).toBe(3);
  });
});
