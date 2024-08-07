import { findPairs } from "./findPairs";

describe("findPairs", () => {
  it("case 1", () => {
    const nums = [3, 1, 4, 1, 5],
      k = 2;
    const total = findPairs(nums, k);
    console.log(total);
  });

  it("case 2", () => {
    const nums = [1, 2, 3, 4, 5],
      k = 1;
    const total = findPairs(nums, k);
    console.log(total);
  });

  it("case 3", () => {
    const nums = [1, 3, 1, 5, 4],
      k = 0;
    const total = findPairs(nums, k);
    console.log(total);
  });
});
