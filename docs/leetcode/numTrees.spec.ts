import { numTrees } from "./numTrees";

describe("numTrees", () => {
  it("case 1", () => {
    const count = numTrees(3);

    expect(count).toBe(5);
  });

  it("case 2", () => {
    const count = numTrees(4);
    expect(count).toBe(14);
  });
});
