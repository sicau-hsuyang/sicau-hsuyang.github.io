import { reversePrefix } from "./reversePrefix";

describe("reversePrefix", () => {
  it("case 1", () => {
    const word = "abcdefd",
      ch = "d";
    const res = reversePrefix(word, ch);
    expect(res).toBe("dcbaefd");
  });

  it("case 2", () => {
    const word = "xyxzxe",
      ch = "z";
    const res = reversePrefix(word, ch);
    expect(res).toBe("zxyxxe");
  });

  it("case 3", () => {
    const word = "abcd",
      ch = "z";
    const res = reversePrefix(word, ch);
    expect(res).toBe("abcd");
  });
});
