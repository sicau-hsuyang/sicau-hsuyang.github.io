import { reachableNodes } from "./reachableNodes";

describe("reachableNodes", () => {
  it("case 1", () => {
    const n = 7,
      edges = [
        [0, 1],
        [1, 2],
        [3, 1],
        [4, 0],
        [0, 5],
        [5, 6],
      ],
      restricted = [4, 5];
    reachableNodes(n, edges, restricted);
  });
});
