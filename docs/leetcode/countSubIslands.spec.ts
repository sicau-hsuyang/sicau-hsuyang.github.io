import { countSubIslands } from "./countSubIslands";

describe("countSubIslands", () => {
  it("case 1", () => {
    const grid1 = [
        [1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 0, 1, 1],
      ],
      grid2 = [
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
        [0, 1, 0, 0, 0],
        [1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0],
      ];
    const res = countSubIslands(grid1, grid2);
    expect(res).toBe(3);
  });
});
