import { countSubstrings, isPalindrome } from "./countSubstrings";

describe("countSubstrings", () => {
  it("case 1", () => {
    const s = "aaa";
    const res = countSubstrings(s);
    console.log(res);
  });

  it("case 2", () => {
    const s = "aaba";
    const res = countSubstrings(s);
    console.log(res);
  });
});
