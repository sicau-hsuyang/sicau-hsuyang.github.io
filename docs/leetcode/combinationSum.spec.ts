import { combinationSum } from "./combinationSum";

describe("combinationSum", () => {
  it("case 1", () => {
    const candidates = [2, 3, 6, 7],
      target = 7;
    const results = combinationSum(candidates, target);
    expect(results.length).toBe(2);
    expect(results[0]).toEqual([2, 2, 3]);
    expect(results[1]).toEqual([7]);
  });
});
