import { intersect } from "./intersect";

describe("intersect test", () => {
  it("case 1", () => {
    const nums1 = [1, 2, 2, 1],
      nums2 = [2, 2];
    const expectResults = [2, 2];
    const results = intersect(nums1, nums2);
    expect(results).toEqual(expectResults);
  });

  it("case 2", () => {
    const nums1 = [4, 9, 5],
      nums2 = [9, 4, 9, 8, 4];
    const expectResults = [4, 9];
    const results = intersect(nums1, nums2);
    expect(results.length).toEqual(expectResults.length);
    expect(results).toContain(4);
    expect(results).toContain(9);
  });
});
