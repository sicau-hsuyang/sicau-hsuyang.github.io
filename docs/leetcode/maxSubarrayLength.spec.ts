import { maxSubarrayLength } from "./maxSubarrayLength";

describe("maxSubarrayLength", () => {
  it("case 1", () => {
    const nums = [1, 2, 3, 1, 2, 3, 1, 2],
      k = 2;
    const len = maxSubarrayLength(nums, k);
    expect(len).toBe(6);
  });

  it("case 2", () => {
    const nums = [1, 2, 3, 1, 2, 3, 1, 2],
      k = 1;
    const len = maxSubarrayLength(nums, k);
    expect(len).toBe(3);
  });

  it("case 3", () => {
    const nums = [1, 2, 2, 3, 3, 1, 4, 3, 1, 2],
      k = 1;
    const len = maxSubarrayLength(nums, k);
    expect(len).toBe(4);
  });

  it("case 4", () => {
    const nums = [5, 4, 3, 1, 2, 2, 3, 3, 1, 4, 3, 1, 2],
      k = 1;
    const len = maxSubarrayLength(nums, k);
    expect(len).toBe(5);
  });
  it("case 5", () => {
    const nums = [1, 2, 1, 2, 1, 2, 1, 2],
      k = 1;
    const len = maxSubarrayLength(nums, k);
    expect(len).toBe(2);
  });
  it("case 6", () => {
    const nums = [5, 5, 5, 5, 5, 5, 5],
      k = 4;
    const len = maxSubarrayLength(nums, k);
    expect(len).toBe(4);
  });
});
