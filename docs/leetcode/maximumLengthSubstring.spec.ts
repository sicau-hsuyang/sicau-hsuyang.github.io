import { maximumLengthSubstring } from "./maximumLengthSubstring";

describe("maximumLengthSubstring", () => {
  it("case 1", () => {
    const s = "bcbbbcba";
    const len = maximumLengthSubstring(s);
    expect(len).toBe(4);
  });

  it("case 2", () => {
    const s = "aaa";
    const len = maximumLengthSubstring(s);
    expect(len).toBe(2);
  });

  it("case 3", () => {
    const s = "a";
    const len = maximumLengthSubstring(s);
    expect(len).toBe(1);
  });

  it("case 4", () => {
    const s = "abccdada";
    const len = maximumLengthSubstring(s);
    expect(len).toBe(7);
  });

  it("case 5", () => {
    const s = "aadaad";
    const len = maximumLengthSubstring(s);
    expect(len).toBe(4);
  });

  it("case 6", () => {
    const s = "aaabababba";
    const len = maximumLengthSubstring(s);
    expect(len).toBe(4);
  });
});
