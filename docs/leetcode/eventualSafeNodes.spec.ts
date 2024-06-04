import { eventualSafeNodes } from "./eventualSafeNodes";

describe("eventualSafeNodes", () => {
  it("case 1", () => {
    const graph = [[1, 2], [2, 3], [5], [0], [5], [], []];
    const res = eventualSafeNodes(graph);
    expect(res).toEqual([2, 4, 5, 6]);
  });

  it("case 2", () => {
    const graph = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []];
    const res = eventualSafeNodes(graph);
    expect(res).toEqual([4]);
  });

  it("case 3", () => {
    const graph = [[], [0, 2, 3, 4], [3], [4], []];
    const res = eventualSafeNodes(graph);
    expect(res).toEqual([0, 1, 2, 3, 4]);
  });

  it("case 4", () => {
    const graph = [[1, 2], [2, 3], [5], [0], [5], [], [2, 7], [], [4]];
    const res = eventualSafeNodes(graph);
    expect(res).toEqual([2, 4, 5, 6, 7, 8]);
  });
});
