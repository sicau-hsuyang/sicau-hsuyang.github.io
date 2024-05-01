import { fourSum } from "./fourSum";

describe("fourSum", () => {
  it("case 1", () => {
    const nums = [1, 0, -1, 0, -2, 2],
      target = 0;
    fourSum(nums, target);
  });

  it("case 2", () => {
    const nums = [1, 0, -1, 0, -2, 2, -8, 92, 19, 23, 45, -30, -23, 4],
      target = 0;
    fourSum(nums, target);
  });
});
