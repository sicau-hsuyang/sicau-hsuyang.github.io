import { longestSemiRepetitiveSubstring } from "./longestSemiRepetitiveSubstring";

describe("longestSemiRepetitiveSubstring", () => {
  it("case 1", () => {
    const s = "52233";
    const val = longestSemiRepetitiveSubstring(s);

    expect(val).toBe(4);
  });

  it("case 2", () => {
    const s = "5494";
    const val = longestSemiRepetitiveSubstring(s);

    expect(val).toBe(4);
  });

  it("case 3", () => {
    const s = "1111111";
    const val = longestSemiRepetitiveSubstring(s);

    expect(val).toBe(2);
  });

  it("case 4", () => {
    const s = "11421310311111";
    const val = longestSemiRepetitiveSubstring(s);
    // 1142131031
    expect(val).toBe(10);
  })
});
