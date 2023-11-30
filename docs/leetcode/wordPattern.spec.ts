import { wordPattern } from "./wordPattern";

describe("wordPattern", () => {
  it("case 1", () => {
    const pattern = "abba",
      s = "dog dog dog dog";
    const res = wordPattern(pattern, s);
    expect(res).toBe(false);
  });

  it("case 3", () => {
    const pattern = "abc",
      s = "dog cat dog";
    const res = wordPattern(pattern, s);
    expect(res).toBe(false);
  });

  it("case 4", () => {
    const pattern = "jquery",
      s = "jquery";
    const res = wordPattern(pattern, s);
    expect(res).toBe(false);
  });
});
