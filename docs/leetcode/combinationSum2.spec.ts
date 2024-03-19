import { combinationSum2 } from "./combinationSum2";

describe("combinationSum2", () => {
  it("case 1", () => {
    const candidates = [10, 1, 2, 7, 6, 1, 5],
      target = 8;
    const results = combinationSum2(candidates, target);
    console.log(results);
  });

  it("case 2", () => {
    const now1 = Date.now();
    const candidates = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1,
      ],
      target = 27;
    const results = combinationSum2(candidates, target);
    const now2 = Date.now();
    console.log(now2 - now1);
    expect(results.length).toBe(0);
  });

  it("case 3", () => {
    const candidates = [
        14, 6, 25, 9, 30, 20, 33, 34, 28, 30, 16, 12, 31, 9, 9, 12, 34, 16, 25,
        32, 8, 7, 30, 12, 33, 20, 21, 29, 24, 17, 27, 34, 11, 17, 30, 6, 32, 21,
        27, 17, 16, 8, 24, 12, 12, 28, 11, 33, 10, 32, 22, 13, 34, 18, 12,
      ],
      target = 27;
    const results = combinationSum2(candidates, target);
    console.log(results);
  });

  it("case 4", () => {
    const candidates = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1,
      ],
      target = 30;
    const results = combinationSum2(candidates, target);
    console.log(results);
  });
});
