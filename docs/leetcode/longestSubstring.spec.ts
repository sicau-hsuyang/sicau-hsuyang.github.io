import { longestSubstring } from "./longestSubstring";

describe("longestSubstring", () => {
  it("case 1", () => {
    const s = "aaabb",
      k = 3;
    const size = longestSubstring(s, k);
    expect(size).toBe(3);
  });

  it("case 2", () => {
    const s = "ababbc",
      k = 2;
    const size = longestSubstring(s, k);
    expect(size).toBe(5);
  });

  it("case 3", () => {
    const s = "aaabbasfksdfdksndadaseojjfqakkfowkc",
      k = 3;
    const size = longestSubstring(s, k);
    expect(size).toBe(3);
  });

  it("case 4", () => {
    const s = "aaabbasfksdfdkkssandadnndaseojjfqakkfowkc",
      k = 3;
    const size = longestSubstring(s, k);
    expect(size).toBe(3);
  });
});
