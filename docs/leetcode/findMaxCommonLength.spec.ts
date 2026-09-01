import { findLength } from "./findMaxCommonLength";

describe("findLength", () => {
  it("case 1", () => {
    const A = [1, 2, 3, 2, 1],
      B = [3, 2, 1, 4, 7];
    const res = findLength(A, B);
    expect(res).toBe(3);
  });

  it("case 2", () => {
    const A = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      B = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
    const res = findLength(A, B);
    expect(res).toBe(9);
  });
});
