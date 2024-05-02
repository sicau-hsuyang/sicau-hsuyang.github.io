import { maxVowels } from "./maxVowels";

describe("maxVowels", () => {
  it("case 1", () => {
    const s = "abciiidef",
      k = 3;
    const count = maxVowels(s, k);
    expect(count).toBe(3);
  });

  it("case 2", () => {
    const s = "leetcode",
      k = 3;
    const count = maxVowels(s, k);
    expect(count).toBe(2);
  });
});
