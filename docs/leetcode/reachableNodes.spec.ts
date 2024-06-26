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
    const total = reachableNodes(n, edges, restricted);
    expect(total).toBe(4);
  });

  it("case 2", () => {
    const n = 7,
      edges = [
        [0, 1],
        [0, 2],
        [0, 5],
        [0, 4],
        [3, 2],
        [6, 5],
      ],
      restricted = [4, 2, 1];
    const total = reachableNodes(n, edges, restricted);
    expect(total).toBe(3);
  });
});
