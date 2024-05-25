import { findUnsortedSubarray } from "./findUnsortedSubarray";

describe("findUnsortedSubarray", () => {
  it("case 1", () => {
    const nums = [2, 6, 4, 5, 8, 10, 9, 15];
    const len = findUnsortedSubarray(nums);
    expect(len).toBe(6);
  });

  it("case 2", () => {
    const nums = [1, 2, 3, 4];
    const len = findUnsortedSubarray(nums);
    expect(len).toBe(5);
  });

  it("case 3", () => {
    const nums = [1, 4, 2, 5, 3, 6];
    const len = findUnsortedSubarray(nums);
    expect(len).toBe(4);
  });

  it("case 4", () => {
    const nums = [3, 2, 1];
    const len = findUnsortedSubarray(nums);
    expect(len).toBe(3);
  });

  it("case 5", () => {
    const nums = [3, 1, 2];
    const len = findUnsortedSubarray(nums);
    expect(len).toBe(3);
  });

  it("case 6", () => {
    const nums = [2, 1];
    const len = findUnsortedSubarray(nums);
    expect(len).toBe(3);
  });

  it("case 7", () => {
    const nums = [1];
    const len = findUnsortedSubarray(nums);
    expect(len).toBe(0);
  });
});
