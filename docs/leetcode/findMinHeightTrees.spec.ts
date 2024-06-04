import { findMinHeightTrees } from "./findMinHeightTrees";

describe("findMinHeightTrees", () => {
  it("case 1", () => {
    const n = 4,
      edges = [
        [1, 0],
        [1, 2],
        [1, 3],
      ];
    const res = findMinHeightTrees(n, edges);
    expect(res).toEqual([1]);
  });

  it("case 2", () => {
    const n = 6,
      edges = [
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 4],
        [5, 4],
      ];
    const res = findMinHeightTrees(n, edges);
    expect(res).toEqual([3, 4]);
  });
});
