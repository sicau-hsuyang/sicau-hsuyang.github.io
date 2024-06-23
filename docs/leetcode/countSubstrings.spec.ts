import { countSubstrings, isPalindrome } from "./countSubstrings";

describe("isPalindrome", () => {
  it("case 1", () => {
    const s = "aaa";
    isPalindrome(s, 0, s.length - 1);
  });

  it("case 2", () => {
    const s = "aa";
    isPalindrome(s, 0, s.length - 1);
  });
});

describe("countSubstrings", () => {
  it("case 1", () => {});
});
