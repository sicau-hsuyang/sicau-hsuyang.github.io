import { longestSubsequence } from "./longestSubsequence";

describe("longestSubsequence", () => {
  it("case 1", () => {
    const arr = [1, 2, 3, 4],
      difference = 1;

    const res = longestSubsequence(arr, difference);

    expect(res).toBe(4);
  });

  it("case 2", () => {
    const arr = [1, 5, 7, 8, 5, 3, 4, 2, 1],
      difference = -2;
    const res = longestSubsequence(arr, difference);
    expect(res).toBe(4);
  });
});
