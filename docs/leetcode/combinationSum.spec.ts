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

  it("case 2", () => {
    const candidates = [2, 3, 5],
      target = 8;
    const results = combinationSum(candidates, target);
    expect(results.length).toBe(3);
    expect(results[0]).toEqual([2, 2, 2, 2]);
    expect(results[1]).toEqual([2, 3, 3]);
    expect(results[2]).toEqual([3, 5]);
  });

  it("case 3", () => {
    const candidates = [7, 3, 2],
      target = 18;
    const results = combinationSum(candidates, target);
    expect(results.length).toBe(6);
  });
});
