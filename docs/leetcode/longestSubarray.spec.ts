import { longestSubarray } from "./longestSubarray";

describe("longestSubarray", () => {
  it("case 1", () => {
    const nums = [1, 1, 0, 1];
    const len = longestSubarray(nums);
    expect(len).toBe(3);
  });

  it("case 2", () => {
    const nums = [0, 0, 0, 0];
    const len = longestSubarray(nums);
    expect(len).toBe(0);
  });

  it("case 3", () => {
    const nums = [1, 1, 1];
    const len = longestSubarray(nums);
    expect(len).toBe(2);
  });

  it("case 4", () => {
    const nums = [0, 1, 1, 1, 0, 1, 1, 0, 1];
    const len = longestSubarray(nums);
    expect(len).toBe(5);
  });
});
