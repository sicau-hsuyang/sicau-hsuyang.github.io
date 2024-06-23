import { shortestBridge } from "./shortestBridge";

describe("shortestBridge", () => {
  it("case 1", () => {
    const grid = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    shortestBridge(grid)
  });
});
