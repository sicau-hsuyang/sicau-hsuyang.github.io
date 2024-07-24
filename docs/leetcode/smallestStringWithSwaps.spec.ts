import { smallestStringWithSwaps } from "./smallestStringWithSwaps";

describe("smallestStringWithSwaps", () => {
  it("case 1", () => {
    const s = "cba",
      pairs = [
        [0, 1],
        [1, 2],
      ];
    smallestStringWithSwaps(s, pairs);
  });

  it("case 2", () => {
    const s = "dcab",
      pairs = [
        [0, 3],
        [1, 2],
      ];
  });
});
