import { findAndReplacePattern } from "./findAndReplacePattern";

describe("findAndReplacePattern", () => {
  it("case 1", () => {
    const words = ["abc", "deq", "mee", "aqq", "dkd", "ccc"],
      pattern = "abb";
    const res = findAndReplacePattern(words, pattern);
    expect(res).toEqual(["mee", "aqq"]);
  });

  it("case 2.1", () => {
    const words = ["abc"],
      pattern = "abb";
    const res = findAndReplacePattern(words, pattern);
    expect(res).toEqual([]);
  });

  it("case 2.2", () => {
    const words = ["ccc"],
      pattern = "abb";
    const res = findAndReplacePattern(words, pattern);
    expect(res).toEqual([]);
  });

  it("case 2", () => {
    const words = ["ef", "fq", "ao", "at", "lx"],
      pattern = "ya";
    const res = findAndReplacePattern(words, pattern);
    expect(res).toEqual(["ef", "fq", "ao", "at", "lx"]);
  });

  it("case 3", () => {
    const words = ["ao"],
      pattern = "ya";
    const res = findAndReplacePattern(words, pattern);
    expect(res).toEqual(["ao"]);
  });
});
