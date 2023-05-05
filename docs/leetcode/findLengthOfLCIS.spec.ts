import { findLengthOfLCIS } from "./findLengthOfLCIS";

describe("find length of LCIS", () => {
  it("case 1", () => {
    const res = findLengthOfLCIS([1, 3, 5, 4, 7]);
    expect(res).toBe(3);
  });

  it("case 2", () => {
    const res = findLengthOfLCIS([2, 2, 2, 2, 2]);
    expect(res).toBe(1);
  });

  it("case 3", () => {
    const res = findLengthOfLCIS([10, 9, 8, 7]);
    expect(res).toBe(1);
  });

  it("case 4", () => {
    const res = findLengthOfLCIS([0, 1, 2, 3]);
    expect(res).toBe(4);
  });

  it("case 5", () => {
    const res = findLengthOfLCIS([0, 1, -1, -2]);
    expect(res).toBe(2);
  });
});
