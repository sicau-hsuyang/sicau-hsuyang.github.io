import { jump } from "./jump";

describe("jump", () => {
  it("case 1", () => {
    const nums = [2, 3, 1, 1, 4];
    const step = jump(nums);
    expect(step).toBe(2);
  });

  it("case 2", () => {
    const nums = [2, 3, 0, 1, 4];
    const step = jump(nums);
    expect(step).toBe(2);
  });

  it("case 3", () => {
    const nums = [2, 1];
    const step = jump(nums);
    expect(step).toBe(1);
  });

  it("case 4", () => {
    const nums = [1, 1];
    const step = jump(nums);
    expect(step).toBe(1);
  });

  it("case 5", () => {
    const nums = [1, 2, 3];
    const step = jump(nums);
    expect(step).toBe(2);
  });

  it("case 6", () => {
    const nums = [0];
    const step = jump(nums);
    expect(step).toBe(0);
  });
});
