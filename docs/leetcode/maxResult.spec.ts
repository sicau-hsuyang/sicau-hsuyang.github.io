import { maxResult } from "./maxResult";

describe("maxResult", () => {
  it("case 1", () => {
    const nums = [1, -1, -2, 4, -7, 3],
      k = 2;
    const score = maxResult(nums, k);
    console.log(score);
  });

  it("case 2", () => {
    const nums = [10, -5, -2, 4, 0, 3],
      k = 3;
    const score = maxResult(nums, k);
    console.log(score);
  });

  it("case 3", () => {
    const nums = [1, -5, -20, 4, -1, 3, -6, -3],
      k = 2;
    const score = maxResult(nums, k);
    console.log(score);
  });
});
