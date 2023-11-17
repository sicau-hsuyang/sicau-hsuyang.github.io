import { subarraysDivByK } from "./subarraysDivByK";

describe("subarraysDivByK", () => {
  it("case 1", () => {
    const nums = [4, 5, 0, -2, -3, 1],
      k = 5;
    const count = subarraysDivByK(nums, k);
    expect(count).toBe(7);
  });

  it("case 2", () => {
    const nums = [2, -4, 3, -1, 2, 12, -1, 3, -4, 6, 1];
    const k = 5;
    const count = subarraysDivByK(nums, k);
    expect(count).toBe(9);
  });
});
