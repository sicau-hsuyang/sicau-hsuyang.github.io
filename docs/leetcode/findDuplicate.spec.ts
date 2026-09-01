import { findDuplicate } from "./findDuplicate";

describe("findDuplicate", () => {
  it("case 1", () => {
    const nums = [1, 3, 4, 2, 2];
    const res = findDuplicate(nums);
    expect(res).toBe(2);
  });

  it("case 2", () => {
    const nums = [3, 3, 3, 3, 3];
    const res = findDuplicate(nums);
    expect(res).toBe(3);
  });

  it("case 3", () => {
    const nums = [3, 1, 3, 4, 2];
    const res = findDuplicate(nums);
    expect(res).toBe(3);
  });
});
