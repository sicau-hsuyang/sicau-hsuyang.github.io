import { permuteUnique } from "./permuteUnique";

describe("permuteUnique", () => {
  it("case 1", () => {
    const nums = [1, 1, 2];
    const results = permuteUnique(nums);
    console.log(results);
  });

  it("case 3", () => {
    const nums = [1, 1, 1, 2];
    const results = permuteUnique(nums);
    console.log(results);
  });

  it("case 2", () => {
    const nums = [1, 2, 3];
    const results = permuteUnique(nums);
    console.log(results);
  });

  it("case 4", () => {
    const nums = [1, 1, 2, 2];
    const results = permuteUnique(nums);
    console.log(results);
  });
});
