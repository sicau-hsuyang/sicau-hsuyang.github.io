import { findChampion } from "./findChampion";

describe("findChampion", () => {
  it("case 1", () => {
    const n = 3,
      edges = [
        [0, 1],
        [1, 2],
      ];
    const champion = findChampion(n, edges);
    expect(champion).toBe(0);
  });

  it("case 2", () => {
    const n = 4,
      edges = [
        [0, 2],
        [1, 3],
        [1, 2],
      ];
    const champion = findChampion(n, edges);
    expect(champion).toBe(-1);
  });
});
