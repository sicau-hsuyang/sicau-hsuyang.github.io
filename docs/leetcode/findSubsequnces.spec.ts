import { findSubsequences } from "./findSubsequences";

describe("find subsequences", () => {
  it("case 1", () => {
    const input = [4, 6, 7, 7];
    const results = findSubsequences(input);
    const expectVal = [
      [4, 6],
      [4, 6, 7],
      [4, 6, 7, 7],
      [4, 7],
      [4, 7, 7],
      [6, 7],
      [6, 7, 7],
      [7, 7],
    ];
    expect(results.length).toBe(expectVal.length);
  });

  it("case 2", () => {
    const input = [4, 4, 3, 2, 1];
    const results = findSubsequences(input);
    const expectVal = [[4, 4]];
    expect(results.length).toBe(expectVal.length);
  });

  it("case 3", () => {
    const input = [4, 4, 7, 7, 7, 7];
    const results = findSubsequences(input);
    const expectVal = [
      [4, 4],
      [4, 7],
      [4, 7, 7, 7],
      [7, 7],
      [7, 7, 7],
    ];
    expect(results.length).toBe(expectVal.length);
  });
});
