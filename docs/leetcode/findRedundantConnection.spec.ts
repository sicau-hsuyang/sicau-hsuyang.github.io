import { FindRedundantConnectionDemo } from "./findRedundantConnection";

describe("FindRedundantConnectionDemo", () => {
  it("FindRedundantConnectionDemo 1", () => {
    const edges = [
      [1, 2],
      [1, 3],
      [2, 3],
    ];
    const res = FindRedundantConnectionDemo.findRedundantConnection(edges);
    expect(res).toEqual([2, 3]);
  });

  it("FindRedundantConnectionDemo 2", () => {
    const edges = [
      [1, 5],
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 4],
    ];
    const res = FindRedundantConnectionDemo.findRedundantConnection(edges);
    expect(res).toEqual([1, 4]);
  });
});
