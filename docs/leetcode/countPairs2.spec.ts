import { countPairs } from "./countPairs2";

describe("countPairs", () => {
  it("case 1", () => {
    const n = 3,
      edges = [
        [0, 1],
        [0, 2],
        [1, 2],
      ];
    const total = countPairs(n, edges);
    expect(total).toBe(0);
  });

  it("case 2", () => {
    const n = 7,
      edges = [
        [0, 2],
        [0, 5],
        [2, 4],
        [1, 6],
        [5, 4],
      ];
    const total = countPairs(n, edges);
    expect(total).toBe(14);
  });

  it("case 3", () => {
    const n = 100000,
      edges = [];
    const total = countPairs(n, edges);
    expect(total).toBe(100000);
  });
});
