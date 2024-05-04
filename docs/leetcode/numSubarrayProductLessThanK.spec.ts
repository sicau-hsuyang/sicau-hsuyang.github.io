import { numSubarrayProductLessThanK } from "./numSubarrayProductLessThanK";

describe("numSubarrayProductLessThanK", () => {
  it("case 1", () => {
    const nums = [10, 5, 2, 6],
      k = 100;
    const val = numSubarrayProductLessThanK(nums, k);
    expect(val).toBe(8);
  });

  it("case 3", () => {
    const nums = [10, 110, 99, 5, 2, 6],
      k = 100;
    const val = numSubarrayProductLessThanK(nums, k);
    expect(val).toBe(8);
  });

  it("case 2", () => {
    const nums = [1, 2, 3],
      k = 0;
    const val = numSubarrayProductLessThanK(nums, k);
    expect(val).toBe(0);
  });

  it("case 4", () => {
    const nums = [1, 2, 1, 2, 3, 1],
      k = 1;
    const val = numSubarrayProductLessThanK(nums, k);
    expect(val).toBe(0);
  });

  it("case 5", () => {
    const nums = [1, 1, 1, 1, 1, 1, 1, 1, 1],
      k = 2;
    const val = numSubarrayProductLessThanK(nums, k);
    expect(val).toBe(45);
  });
});
