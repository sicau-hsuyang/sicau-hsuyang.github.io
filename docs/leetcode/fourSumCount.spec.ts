import { fourSumCount } from "./fourSumCount";

describe("fourSumCount", () => {
  it("case 1", () => {
    const nums1 = [1, 2],
      nums2 = [-2, -1],
      nums3 = [-1, 2],
      nums4 = [0, 2];
    const total = fourSumCount(nums1, nums2, nums3, nums4);
    console.log(total);
  });

  it("case 2", () => {
    const nums1 = [1, 2, 2, 4, 2],
      nums2 = [-2, -1, -3, -4, 2],
      nums3 = [-1, 2, -6, -2, 1],
      nums4 = [0, 2, 4, 5, -4];
    const total = fourSumCount(nums1, nums2, nums3, nums4);
    console.log(total);
  });
});
