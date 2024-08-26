import { removeDuplicateLetters } from "./removeDuplicateLetters";

describe("removeDuplicateLetters", () => {
  it("case 1", () => {
    const s = "cbacdcbc";
    const res = removeDuplicateLetters(s);
    expect(res).toBe("acdb");
  });

  it("case 2", () => {
    const s = "cbacdcbcabaccddeif";
    const res = removeDuplicateLetters(s);
    expect(res).toBe("acdb");
  });
});
