import { longestSubarray } from "./longestSubarrayAbs";

describe("longestSubarray", () => {
  it("case 1", () => {
    const nums = [8, 2, 4, 7],
      limit = 4;
    const len = longestSubarray(nums, limit);
    expect(len).toBe(2);
  });

  it("case 2", () => {
    const nums = [8, 2, 4, 7, 6, 5, 4, 3, 4, 2, 1],
      limit = 4;
    const len = longestSubarray(nums, limit);
    expect(len).toBe(7);
  });
});
