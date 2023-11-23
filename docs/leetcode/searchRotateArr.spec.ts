import { search } from "./searchRotateArr";

describe("search rotate array", () => {
  it("case 1", () => {
    const nums = [4, 5, 6, 7, 0, 1, 2],
      target = 0;
    const pos = search(nums, target);
    expect(pos).toBe(4);
  });

  it("case 2", () => {
    const nums = [4, 5, 6, 7, 0, 1, 2],
      target = 3;
    const pos = search(nums, target);
    expect(pos).toBe(-1);
  });

  it("case 3", () => {
    const nums = [4, 5, 6, 7, 0, 1, 2],
      target = 1;
    const pos = search(nums, target);
    expect(pos).toBe(5);
  });

  it("case 4", () => {
    const nums = [4, 5, 6, 7, 0, 1, 2],
      target = 2;
    const pos = search(nums, target);
    expect(pos).toBe(6);
  });

  it("case 5", () => {
    const nums = [4, 5, 6, 7, 0, 1, 2],
      target = 5;
    const pos = search(nums, target);
    expect(pos).toBe(1);
  });

  it("case 6", () => {
    const nums = [4, 5, 6, 7, 0, 1, 2],
      target = 6;
    const pos = search(nums, target);
    expect(pos).toBe(2);
  });

  it("case 7", () => {
    const nums = [4, 5, 6, 7, 0, 1, 2],
      target = 7;
    const pos = search(nums, target);
    expect(pos).toBe(3);
  });

  it("case 8", () => {
    const nums = [1],
      target = 1;
    const pos = search(nums, target);
    expect(pos).toBe(0);
  });

  it("case 9", () => {
    const nums = [2, 1],
      target = 2;
    const pos = search(nums, target);
    expect(pos).toBe(0);
  });

  it("case 10", () => {
    const nums = [6, 7, 1, 2, 3, 4, 5],
      target = 6;
    const pos = search(nums, target);
    expect(pos).toBe(0);
  });
});
