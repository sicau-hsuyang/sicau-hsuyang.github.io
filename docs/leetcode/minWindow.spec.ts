import { minWindow } from "./minWindow";

describe("minWindow", () => {
  it("case 1", () => {
    const s = "ADOBECODEBANC",
      t = "ABC";
    const re = minWindow(s, t);
    console.log(re);
  });

  it("case 2", () => {
    const s = "ADOBECODEBANC",
      t = "AODC";
    const re = minWindow(s, t);
    console.log(re);
  });

  it("case 3", () => {
    const s = "ADOBECODEBANC",
      t = "AC";
    const re = minWindow(s, t);
    console.log(re);
  });

  it("case 4", () => {
    const s = "ADOBECODEBANC",
      t = "D";
    const re = minWindow(s, t);
    console.log(re);
  });

  it("case 5", () => {
    const s = "ADOBECODEBANC",
      t = "DDD";
    const re = minWindow(s, t);
    console.log(re);
  });

  it("case 6", () => {
    const s = "cabwefgewcwaefgcf",
      t = "cae";
    const re = minWindow(s, t);
    console.log(re);
  });
});
