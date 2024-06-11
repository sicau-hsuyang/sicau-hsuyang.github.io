import { equationsPossible } from "./equationsPossible";

describe("equationsPossible", () => {
  it("case 1", () => {
    const s = ["c==c", "b==d", "x!=z"];
    const flag = equationsPossible(s);
    expect(flag).toBe(true);
  });

  it("case 2", () => {
    const s = ["a==b", "b!=a"];
    const flag = equationsPossible(s);
    expect(flag).toBe(false);
  });

  it("case 3", () => {
    const s = ["b==a", "a==b"];
    const flag = equationsPossible(s);
    expect(flag).toBe(true);
  });

  it("case 4", () => {
    const s = ["a==b", "b==c", "a==c"];
    const flag = equationsPossible(s);
    expect(flag).toBe(true);
  });

  it("case 5", () => {
    const s = ["a==b", "b!=c", "c==a"];
    const flag = equationsPossible(s);
    expect(flag).toBe(false);
  });
});
