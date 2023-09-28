import { findSmallestSetOfVertices } from "./findSmallestSetOfVertices";

describe("findSmallestSetOfVertices", () => {
  it("case 1", () => {
    const n = 6,
      edges = [
        [0, 1],
        [0, 2],
        [2, 5],
        [3, 4],
        [4, 2],
      ];
    const results = findSmallestSetOfVertices(n, edges);
    expect(results).toEqual([0, 3]);
  });

  it("case 2", () => {
    const n = 5,
      edges = [
        [0, 1],
        [2, 1],
        [3, 1],
        [1, 4],
        [2, 4],
      ];
    const results = findSmallestSetOfVertices(n, edges);
    expect(results).toEqual([0, 2, 3]);
  });
});
