import { findMaxAverage } from "./findMaxAverage";

describe("findMaxAverage", () => {
  it("case 1", () => {
    const nums = [1, 12, -5, -6, 50, 3],
      k = 1;
    const val = findMaxAverage(nums, k);
    console.log(val);
  });

  it("case 2", () => {
    const nums = [1],
      k = 1;
    const val = findMaxAverage(nums, k);
    console.log(val);
  });
});
