import { genNext, kmpMatch } from "./kmp-match";
describe("KMP string matching algorithm", () => {
  describe("genNext", () => {
    it("should generate the correct next array for a given pattern", () => {
      expect(genNext("ababaca")).toEqual([0, 0, 1, 2, 3, 0, 1]);
      expect(genNext("abcabcabc")).toEqual([0, 0, 0, 1, 2, 3, 4, 5, 6]);
      expect(genNext("aaaaa")).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe("kmpMatch", () => {
    it("should return -1 for non-matching strings", () => {
      expect(kmpMatch("abc", "def")).toBe(-1);
      expect(kmpMatch("abababa", "abac")).toBe(-1);
    });

    it("should return the correct position for matching strings", () => {
      expect(kmpMatch("ababaca", "aca")).toBe(4);
      expect(kmpMatch("abcabcabc", "abc")).toBe(0);
      expect(kmpMatch("abababa", "aba")).toBe(0);
    });
  });
});
