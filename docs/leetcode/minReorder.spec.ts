import { minReorder } from "./minReorder";

describe("minReorder", () => {
  it("case 1", () => {
    const n = 6,
      connections = [
        [0, 1],
        [1, 3],
        [2, 3],
        [4, 0],
        [4, 5],
      ];
    const result = minReorder(n, connections);
    expect(result).toBe(3);
  });

  it("case 2", () => {
    const n = 5,
      connections = [
        [1, 0],
        [1, 2],
        [3, 2],
        [3, 4],
      ];
    const result = minReorder(n, connections);
    expect(result).toBe(2);
  });

  it("case 3", () => {
    const n = 3,
      connections = [
        [1, 0],
        [2, 0],
      ];
    const result = minReorder(n, connections);
    expect(result).toBe(0);
  });
});
