import { countUnguarded } from "./countUnguarded";

describe("countUnguarded", () => {
  it("case 1", () => {
    const m = 4,
      n = 6,
      guards = [
        [0, 0],
        [1, 1],
        [2, 3],
      ],
      walls = [
        [0, 1],
        [2, 2],
        [1, 4],
      ];
    countUnguarded(m, n, guards, walls);
  });
});
