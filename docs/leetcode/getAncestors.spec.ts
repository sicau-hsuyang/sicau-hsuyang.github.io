import { getAncestors } from "./getAncestors";

describe("get ancestors", () => {
  it("case 1", () => {
    const n = 8,
      edgeList = [
        [0, 3],
        [0, 4],
        [1, 3],
        [2, 4],
        [2, 7],
        [3, 5],
        [3, 6],
        [3, 7],
        [4, 6],
      ];
    const results = getAncestors(n, edgeList);
    expect(results).toEqual([
      [],
      [],
      [],
      [0, 1],
      [0, 2],
      [0, 1, 3],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3],
    ]);
  });

  it("case 2", () => {
    const n = 5,
      edgeList = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [3, 4],
      ];
    const results = getAncestors(n, edgeList);
    expect(results).toEqual([[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3]]);
  });
});
