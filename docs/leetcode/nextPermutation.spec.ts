import { nextPermutation } from "./nextPermutation";

describe("nextPermutation", () => {
  it("case 1", () => {
    const nums = [5, 1, 4, 2, 3];
    // 51432
    nextPermutation(nums);
    console.log(nums);
  });

  it("case 2", () => {
    const nums = [2, 1, 5, 4, 3];
    // 2 3  1 4 5
    nextPermutation(nums);
  });

  it("case 3", () => {
    const nums = [2, 3, 1];
    // 3 1 2
    nextPermutation(nums);
  });

  it("case 4", () => {
    const nums = [5, 1, 1];
    // 3 1 2
    nextPermutation(nums);
  });

  it("case 5", () => {
    const nums = [1, 1, 5];
    // 3 1 2
    nextPermutation(nums);
  });

  it("case 6", () => {
    const nums = [2, 2, 7, 5, 4, 3, 2, 2, 1];
    nextPermutation(nums);
  });

  it("case 7", () => {
    const nums = [1, 2, 3, 4, 5, 6, 7];
    nextPermutation(nums);
  });
});
