import { maxSubArray } from "./maxSubArray";

describe("max sub array", () => {
  it("test case", () => {
    const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const max = maxSubArray(arr);
    expect(max).toBe(6);
  });
});
