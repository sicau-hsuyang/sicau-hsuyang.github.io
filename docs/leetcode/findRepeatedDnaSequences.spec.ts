import { findRepeatedDnaSequences } from "./findRepeatedDnaSequences";

describe("findRepeatedDnaSequences", () => {
  it("case 1", () => {
    const s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT";
    const res = findRepeatedDnaSequences(s);
    expect(res).toEqual(["AAAAACCCCC", "CCCCCAAAAA"]);
  });

  it("case 2", () => {
    const s = "AAAAAAAAAAAAA";
    const res = findRepeatedDnaSequences(s);
    expect(res).toEqual(["AAAAAAAAAA"]);
  });

  it("case 3", () => {
    const s = "AAAAAAAAAAA";
    const res = findRepeatedDnaSequences(s);
    expect(res).toEqual(["AAAAAAAAAA"]);
  })
});
