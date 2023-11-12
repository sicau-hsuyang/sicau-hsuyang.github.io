import { subarraySum } from "./subarraySum";

describe("subarraySum", () => {
  it("study", () => {
    const arr = [2, -4, 3, -1, 2, 12, -1, 3, -4, 6, 1];
    const result = subarraySum(arr, 5);
    expect(result).toBe(2);
  });

  it("case 1", () => {
    const arr = [1, 1, 1];
    const result = subarraySum(arr, 2);
    expect(result).toBe(1);
  });
});
