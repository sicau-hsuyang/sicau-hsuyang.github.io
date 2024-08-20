import { findDuplicates } from "./findDuplicates";

describe("findDuplicates", () => {
  it("case 1", () => {
    const nums = [4, 3, 2, 7, 8, 2, 3, 1];
    const res = findDuplicates(nums);
    console.log(res);
  });

  it("case 2", () => {
    const nums = [1,1,2]
    const res = findDuplicates(nums);
    console.log(res);
  })
});
