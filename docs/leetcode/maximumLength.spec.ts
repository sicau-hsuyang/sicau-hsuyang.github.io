import { maximumLength } from "./maximumLength";

describe("maximumLength", () => {
  it("case 1", () => {
    const s = "aaaa";
    const res = maximumLength(s);
    expect(res).toBe(2);
  });

  it("case 2", () => {
    const s = "abcdef";
    const res = maximumLength(s);
    expect(res).toBe(-1);
  });

  it("case 3", () => {
    const s = "abcaba";
    const res = maximumLength(s);
    expect(res).toBe(1);
  });

  it("case 4", () => {
    const s = "abcab";
    const res = maximumLength(s);
    expect(res).toBe(-1);
  });

  it("case 5", () => {
    const s = "aaaaabcaba";
    const res = maximumLength(s);
    expect(res).toBe(3);
  });

  it("case 6", () => {
    const s = "aaabcaabaabba";
    const res = maximumLength(s);
    expect(res).toBe(2);
  });

  it("case 7", () => {
    const s = "aaabcaaabaaabba";
    const res = maximumLength(s);
    expect(res).toBe(3);
  });

  it("case 8", () => {
    const s = "jinhhhtttttttefffffjjjjjjjjjfffffjjjjjjjjjqvvvvvvg";
    const res = maximumLength(s);
    expect(res).toBe(8);
  });
});
