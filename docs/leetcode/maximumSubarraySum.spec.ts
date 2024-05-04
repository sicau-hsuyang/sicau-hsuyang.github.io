import { maximumSubarraySum } from "./maximumSubarraySum";

describe("maximumSubarraySum", () => {
  it("case 1", () => {
    const nums = [1, 5, 4, 2, 9, 9, 9],
      k = 3;
    maximumSubarraySum(nums, k);
  });
});
