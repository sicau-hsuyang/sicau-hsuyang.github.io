import { findLHS } from "./findLHS";

describe("findLHS", () => {
  it("case 1", () => {
    const nums = [1, 3, 2, 2, 5, 2, 3, 7];
    findLHS(nums);
  });

  it("case 2", () => {
    const nums = [1, 1, 1, 1];
    findLHS(nums);
  });

  it("case 3", () => {
    const nums = [1, 2, 3, 4];
    findLHS(nums);
  });
});
