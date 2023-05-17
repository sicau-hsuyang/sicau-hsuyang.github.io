import { minCostClimbingStairs } from "./minCostClimbingStairs";

describe("min cost climbing stairs", () => {
  it("test 1", () => {
    const arr = [10, 15, 20];
    const cost = minCostClimbingStairs(arr);
    expect(cost).toBe(15);
  });

  it("test 2", () => {
    const arr = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
    const cost = minCostClimbingStairs(arr);
    expect(cost).toBe(6);
  });
});
