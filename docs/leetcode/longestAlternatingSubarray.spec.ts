import { longestAlternatingSubarray } from "./longestAlternatingSubarray";

describe("longestAlternatingSubarray", () => {
  it("case 1", () => {
    const nums = [3, 2, 5, 4],
      threshold = 5;
    const res = longestAlternatingSubarray(nums, threshold);
    expect(res).toEqual(3);
  });

  it("case 2", () => {
    const nums = [1, 2],
      threshold = 2;
    const res = longestAlternatingSubarray(nums, threshold);
    expect(res).toEqual(1);
  });

  it("case 3", () => {
    const nums = [2, 3, 4, 5],
      threshold = 4;
    const res = longestAlternatingSubarray(nums, threshold);
    expect(res).toEqual(3);
  });

  it("case 4", () => {
    const nums = [2, 3, 4, 5],
      threshold = 5;
    const res = longestAlternatingSubarray(nums, threshold);
    expect(res).toEqual(4);
  });

  it("case 5", () => {
    const nums = [2, 3, 4, 5, 6],
      threshold = 5;
    const res = longestAlternatingSubarray(nums, threshold);
    expect(res).toEqual(4);
  });

  it("case 6", () => {
    const nums = [2, 3, 4, 5, 6],
      threshold = 6;
    const res = longestAlternatingSubarray(nums, threshold);
    expect(res).toEqual(5);
  });

  it("case 7", () => {
    const nums = [2, 7],
      threshold = 9;
    const res = longestAlternatingSubarray(nums, threshold);
    expect(res).toEqual(2);
  });
});
