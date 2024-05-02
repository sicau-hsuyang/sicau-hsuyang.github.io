import { minimumRecolors } from "./minimumRecolors";

describe("minimumRecolors", () => {
  it("case 1", () => {
    const blocks = "WBBWWBBWBW",
      k = 7;
    const count = minimumRecolors(blocks, k);
    expect(count).toBe(3);
  });

  it("case 2", () => {
    const blocks = "WBWBBBW",
      k = 2;
    const count = minimumRecolors(blocks, k);
    expect(count).toBe(0);
  });
});
