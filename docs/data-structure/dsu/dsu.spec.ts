import { Dsu } from "./dsu";

describe("dsu", () => {
  it("insert and query and union", () => {
    const dsu = new Dsu<number>();
    dsu.init([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const res1 = dsu.find(1);
    expect(res1 >= 0).toBe(true);
    dsu.union(1, 2);
  });

});
