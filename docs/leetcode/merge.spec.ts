import { merge } from "./merge";

describe("merge", () => {
  it("case 1", () => {
    const A = [1, 2, 3, 0, 0, 0],
      m = 3,
      B = [2, 5, 6],
      n = 3;
    merge(A, m, B, n);
    expect(A).toEqual([1, 2, 2, 3, 5, 6]);
  });

  it("case 2", () => {
    const A = [100, 0, 0, 0, 0, 0, 0],
      m = 1,
      B = [1, 2, 2, 3, 5, 6],
      n = 6;
    merge(A, m, B, n);
    expect(A).toEqual([1, 2, 2, 3, 5, 6, 100]);
  });
});
