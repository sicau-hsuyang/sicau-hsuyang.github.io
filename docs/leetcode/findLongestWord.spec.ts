import { findLongestWord } from "./findLongestWord";

describe("findLongestWord", () => {
  it("case 1", () => {
    const s = "abpcplea",
      dictionary = ["ale", "apple", "ppale", "monkey", "plea"];
    const res = findLongestWord(s, dictionary);
    expect(res).toBe("apple");
  });

  it("case 2", () => {
    const s = "abce",
      dictionary = ["abe", "abc", "abc"];
    const res = findLongestWord(s, dictionary);
    expect(res).toBe("abc");
  });

  it("case 3", () => {
    const s = "aewfafwafjlwajflwajflwafj",
      dictionary = [
        "apple",
        "ewaf",
        "awefawfwaf",
        "awef",
        "awefe",
        "ewafeffewafewf",
      ];
    const res = findLongestWord(s, dictionary);
    expect(res).toBe("ewaf");
  });
});
