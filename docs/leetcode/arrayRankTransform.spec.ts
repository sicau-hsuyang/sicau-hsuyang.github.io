import { arrayRankTransform } from "./arrayRankTransform";

describe("arrayRankTransform", () => {
  it("case 1", () => {
    const arr = [37, 12, 28, 9, 100, 56, 80, 5, 12];
    const res = arrayRankTransform(arr);
    expect(res).toEqual([5, 3, 4, 2, 8, 6, 7, 1, 3]);
  });
});
