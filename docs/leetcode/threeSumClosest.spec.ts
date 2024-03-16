import { threeSumClosest } from "./threeSumClosest";

describe("threeSumClosest", () => {
  it("case 1", () => {
    const nums = [-1, 2, 1, -4],
      target = 1;
    const val = threeSumClosest(nums, target);
    expect(val).toBe(2);
  });

  it("case 2", () => {
    const nums = [0, 0, 0],
      target = 1;
    const val = threeSumClosest(nums, target);
    expect(val).toBe(0);
  });

  it("case 3", () => {
    const nums = [-1, 2, 1, -7, 3, 4, 5, 2, 3, -10, 2, 5, -4],
      target = 1;
    const val = threeSumClosest(nums, target);
    expect(val).toBe(1);
  });
});
