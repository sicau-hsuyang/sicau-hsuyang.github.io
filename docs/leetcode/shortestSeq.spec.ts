import { shortestSeq } from "./shortestSeq";

describe("shortestSeq", () => {
  it("case 1", () => {
    const big = [7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7],
      small = [1, 5, 9];
    const val = shortestSeq(big, small);
    expect(val).toEqual([7, 10]);
  });

  it("case 2", () => {
    const big = [1, 2, 3],
      small = [4];
    const val = shortestSeq(big, small);
    expect(val).toEqual([]);
  });

  it("case 3", () => {
    const big = [7, 5, 9, 0, 2, 1, 3, 5, 7, 5, 8, 8, 9, 7],
      small = [1];
    const val = shortestSeq(big, small);
    expect(val).toEqual([5, 5]);
  });

  it("case 4", () => {
    const big = [7, 5, 9, 0, 2, 1, 3, 5, 7, 5, 8, 8, 9, 7],
      small = [7, 5, 9, 0, 2, 1, 3, 5, 7, 5, 8, 8, 9, 7];
    const val = shortestSeq(big, small);
    expect(val).toEqual([2, 10]);
  });
});
