import { findWhetherExistsPath } from "./findWhetherExistsPath";

describe("findWhetherExistsPath", () => {
  it("case 1", () => {
    const n = 3,
      graph = [
        [0, 1],
        [0, 2],
        [1, 2],
        [1, 2],
      ],
      start = 0,
      target = 2;
    const flag = findWhetherExistsPath(n, graph, start, target);
    console.log(flag);
  });

  it("case 2", () => {
    const n = 5,
      graph = [
        [0, 1],
        [0, 2],
        [0, 4],
        [0, 4],
        [0, 1],
        [1, 3],
        [1, 4],
        [1, 3],
        [2, 3],
        [3, 4],
      ],
      start = 0,
      target = 4;
    const flag = findWhetherExistsPath(n, graph, start, target);
    console.log(flag);
  });
});
