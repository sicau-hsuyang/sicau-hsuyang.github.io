import { balancedString } from "./balancedString";

describe("balancedString", () => {
  it("case 1", () => {
    const s = "QQWE";
    const len = balancedString(s);
    expect(len).toBe(1);
  });

  it("case 2", () => {
    const s = "QQRRWEWERWQWEWEW";
    const len = balancedString(s);
    expect(len).toBe(3);
  });

  it("case 3", () => {
    const s = "QQWWEQERRQQQ";
    const len = balancedString(s);
    expect(len).toBe(3);
  });

  it("case 4", () => {
    const s = "WQWRQQQW";
    const len = balancedString(s);
    expect(len).toBe(3);
  });
});
