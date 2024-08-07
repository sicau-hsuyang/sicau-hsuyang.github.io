import { hIndex } from "./hIndex";

describe("hIndex", () => {
  it("case 1", () => {
    const citations = [3, 0, 6, 1, 5];
    const idx = hIndex(citations);
    console.log(idx)
  });

  it("case 2", () => {
    const citations = [1, 3, 1];
    const idx = hIndex(citations);
    console.log(idx)
  });
});
