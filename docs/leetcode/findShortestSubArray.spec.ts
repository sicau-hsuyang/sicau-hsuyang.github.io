import { findShortestSubArray } from "./findShortestSubArray";

describe("find shortest sub array", () => {
  // TODO: 考虑一下出现频数相同的情况

  it("case 1", () => {
    const nums = [1, 2, 2, 3, 1, 4, 2];
    const size = findShortestSubArray(nums);
    expect(size).toBe(6);
  });

  it("case 2", () => {
    const nums = [1,2,2,3,1];
    const size = findShortestSubArray(nums);
    expect(size).toBe(2);
  });
});
