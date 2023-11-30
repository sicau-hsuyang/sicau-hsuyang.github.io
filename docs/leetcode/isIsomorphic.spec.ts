import { isIsomorphic } from "./isIsomorphic";

describe("isIsomorphic", () => {
  it("case 1", () => {
    const s = "egg",
      t = "add";
    const r = isIsomorphic(s, t);
    expect(r).toBe(true);
  });

  it("case 2", () => {
    const s = "foo",
      t = "bar";
    const r = isIsomorphic(s, t);
    expect(r).toBe(false);
  });

  it("case 3", () => {
    const s = "papex",
      t = "title";
    const r = isIsomorphic(s, t);
    expect(r).toBe(true);
  });

  it("case 4", () => {
    const s = "egg",
      t = "dda";
    const r = isIsomorphic(s, t);
    expect(r).toBe(false);
  });

  it("case 5", () => {
    const s = "badc",
      t = "baba";
    const r = isIsomorphic(s, t);
    expect(r).toBe(false);
  });
});
