import { takeCharacters } from "./takeCharacters";

describe("takeCharacters", () => {
  it("case 1", () => {
    const s = "aabaaaacaabc",
      k = 2;
    const l = takeCharacters(s, k);
    expect(l).toBe(8);
  });

  it("case 2", () => {
    const s = "aabaaaacababcbcbccbaabcabcbabcabc",
      k = 3;
    const l = takeCharacters(s, k);
    expect(l).toBe(9);
  });
});
