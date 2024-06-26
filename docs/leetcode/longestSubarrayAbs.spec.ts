import { longestSubarray } from "./longestSubarrayAbs";

describe("longestSubarray", () => {
  it("case 1", () => {
    const nums = [8, 2, 4, 7],
      limit = 4;
    const len = longestSubarray(nums, limit);
    console.log(len);
  });
});
