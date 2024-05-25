import { nextGreaterElements } from "./nextGreaterElements";

describe("nextGreaterElements", () => {
  it("case 1", () => {
    const nums = [1, 2, 1];
    const res = nextGreaterElements(nums);
    expect(res).toEqual([2, -1, 2]);
  });

  it("case 2", () => {
    const nums = [1, 2, 3, 4, 3];
    const res = nextGreaterElements(nums);
    expect(res).toEqual([2, 3, 4, -1, 4]);
  });

  it("case 3", () => {
    const nums = [10, 9, 5, 6, 7, 23, 4, 6, 10, 3, 2, 10, 6];
    const res = nextGreaterElements(nums);
    expect(res).toEqual([23, 23, 6, 7, 23, -1, 6, 10, 23, 10, 10, 23, 10]);
  });
});
