import { findTargetSumWays } from "./findTargetSumWays";

describe("findTargetSumWays", () => {
  it("case 1", () => {
    const nums = [1, 1, 1, 1, 1],
      target = 3;
    const total = findTargetSumWays(nums, target);
    expect(total).toBe(5);
  });

  it("case 2", () => {
    const nums = [1, 0],
      target = 1;
    const total = findTargetSumWays(nums, target);
    expect(total).toBe(2);
  });

  it("case 3", () => {
    const nums = [0, 1],
      target = 1;
    const total = findTargetSumWays(nums, target);
    expect(total).toBe(2);
  });

  it("case 4", () => {
    const now1 = Date.now();
    const nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      target = 0;
    const total = findTargetSumWays(nums, target);
    const now2 = Date.now();
    console.log(now2 - now1);
    expect(total).toBe(0);
  });
});
