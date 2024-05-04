import { minimumSubarrayLength } from "./minimumSubarrayLength";

describe("minimumSubarrayLength", () => {
  it("case 1", () => {
    const nums = [2, 1, 8],
      k = 10;
    const val = minimumSubarrayLength(nums, k);
    expect(val).toBe(3);
  });
});
