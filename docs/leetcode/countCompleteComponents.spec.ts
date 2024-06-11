import { countCompleteComponents } from "./countCompleteComponents";

describe("countCompleteComponents", () => {
  it("case 1", () => {
    const n = 6,
      edges = [
        [0, 1],
        [0, 2],
        [1, 2],
        [3, 4],
      ];
    const val = countCompleteComponents(n, edges);
    expect(val).toBe(3);
  });

  it("case 2", () => {
    const n = 6,
      edges = [
        [0, 1],
        [0, 2],
        [1, 2],
        [3, 4],
        [3, 5],
      ];
    const val = countCompleteComponents(n, edges);
    expect(val).toBe(1);
  });

  it("case 3 ", () => {
    const n = 4,
      edges = [
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
      ];
    const val = countCompleteComponents(n, edges);
    expect(val).toBe(0);
  });
});
