import { findPeakElement } from "./findPeakElement";

describe("findPeakElement", () => {
  it("case 1", () => {
    const nums = [1, 2, 1, 3, 5, 6, 4];
    findPeakElement(nums);
  });

  it("case 2", () => {
    const nums = [1, 2, 3, 1];
    findPeakElement(nums);
  });

  it("case 3", () => {
    const nums = [1, 2];
    findPeakElement(nums);
  });

  it("case 4", () => {
    const nums = [1];
    findPeakElement(nums);
  });
});
