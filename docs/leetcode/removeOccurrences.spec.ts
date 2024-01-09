import { removeOccurrences } from "./removeOccurrences";

describe("removeOccurrences", () => {
  it("case 1", () => {
    const s = "daabcbaabcbc",
      part = "abc";
    const res = removeOccurrences(s, part);
    expect(res).toBe("dab");
  });

  it("case 2", () => {
    const s = "aabababa",
      part = "aba";
    const res = removeOccurrences(s, part);
    expect(res).toBe("ba");
  });
});
