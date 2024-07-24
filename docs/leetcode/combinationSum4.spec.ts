import { combinationSum4 } from "./combinationSum4";

describe("combinationSum4", () => {
  it("case 1", () => {
    const nums = [1, 2, 3],
      target = 4;
    const total = combinationSum4(nums, target);
    console.log(total);
  });

  it("case 2", () => {
    const nums = [1, 2, 3],
      target = 1;
    const total = combinationSum4(nums, target);
    console.log(total);
  });

  it("case 3", () => {
    const nums = [1, 2, 3],
      target = 2;
    const total = combinationSum4(nums, target);
    console.log(total);
  });

  it("case 4", () => {
    const nums = [43, 56, 27, 14, 18, 22],
      target = 120;
    nums.sort((a, b) => a - b);
    const total = combinationSum4(nums, target);
    console.log(total);
  });
});
