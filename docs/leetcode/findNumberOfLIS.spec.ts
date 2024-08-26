import { findNumberOfLIS } from "./findNumberOfLIS";

describe("findNumberOfLIS", () => {
  it("case 1", () => {
    const seq = [1, 3, 5, 4, 7];
    const len = findNumberOfLIS(seq);
    expect(len).toBe(2);
  });

  it("case 2", () => {
    const seq = [1, 1, 1, 1, 1, 1];
    const len = findNumberOfLIS(seq);
    expect(len).toBe(6);
  });

  it("case 3", () => {
    const seq = [1, 3, 5, 4, 7, 10, 12, 3, 5, 6, 7, 100, 101, 99, 200];
    const len = findNumberOfLIS(seq);
    expect(len).toBe(3);
  });
});
