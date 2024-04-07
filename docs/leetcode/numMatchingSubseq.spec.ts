import { numMatchingSubseq } from "./numMatchingSubseq";

describe("numMatchingSubseq", () => {
  it("case 1", () => {
    const s = "abcde",
      words = ["a", "bb", "acd", "ace"];
    const total = numMatchingSubseq(s, words);
    expect(total).toBe(3);
  });

  it("case 2", () => {
    const s = "dsahjpjauf",
      words = ["ahjpjau", "ja", "ahbwzgqnuk", "tnmlanowax"];
    const total = numMatchingSubseq(s, words);
    expect(total).toBe(2);
  });
});
