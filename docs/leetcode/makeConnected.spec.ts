import { makeConnected } from "./makeConnected";

describe("make connected", () => {
  it("case 1", () => {
    const n = 4,
      connections = [
        [0, 1],
        [0, 2],
        [1, 2],
      ];
    const results = makeConnected(n, connections);
    expect(results).toBe(1);
  });

  it("case 2", () => {
    const n = 6,
      connections = [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
      ];
    const results = makeConnected(n, connections);
    expect(results).toBe(2);
  });

  it("case 3", () => {
    const n = 6,
      connections = [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 2],
      ];
    const results = makeConnected(n, connections);
    expect(results).toBe(-1);
  });

  it("case 4", () => {
    const n = 5,
      connections = [
        [0, 1],
        [0, 2],
        [3, 4],
        [2, 3],
      ];
    const results = makeConnected(n, connections);
    expect(results).toBe(0);
  });
});
