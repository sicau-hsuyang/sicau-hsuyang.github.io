import { longestIncreasingPath } from "./longestIncreasingPath";

describe("longestIncreasingPath", () => {
  it("case 1", () => {
    const matrix = [
      [9, 9, 4],
      [6, 6, 8],
      [2, 1, 1],
    ];
    longestIncreasingPath(matrix);
  });
});
