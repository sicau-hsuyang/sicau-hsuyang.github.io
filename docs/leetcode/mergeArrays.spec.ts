import { mergeArrays } from "./mergeArrays";

describe("mergeArrays", () => {
  it("case 1", () => {
    const nums1 = [
        [1, 2],
        [2, 3],
        [4, 5],
      ],
      nums2 = [
        [1, 4],
        [3, 2],
        [4, 1],
      ];
    const res = mergeArrays(nums1, nums2);
    expect(res).toEqual([
      [1, 6],
      [2, 3],
      [3, 2],
      [4, 6],
    ]);
  });

  it("case 2", () => {
    const nums1 = [
        [2, 4],
        [3, 6],
        [5, 5],
      ],
      nums2 = [
        [1, 3],
        [4, 3],
      ];
    const res = mergeArrays(nums1, nums2);
    expect(res).toEqual([
      [1, 3],
      [2, 4],
      [3, 6],
      [4, 3],
      [5, 5],
    ]);
  });
});
