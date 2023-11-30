import { topKFrequent } from "./topKFrequent";

describe("topKFrequent", () => {
  it("case 1", () => {
    const words = ["i", "love", "leetcode", "i", "love", "coding"],
      k = 2;
    const res = topKFrequent(words, k);
    expect(res).toEqual(["i", "love"]);
  });

  it("case 2", () => {
    const words = ["sun", "sunny"],
      k = 1;
    const res = topKFrequent(words, k);
    expect(res).toEqual(["sun"]);
  });

  it("case 3", () => {
    const words = [
      "the",
      "day",
      "is",
      "sunny",
      "the",
      "the",
      "the",
      "sunny",
      "is",
      "is",
    ];
    const k = 4;
    const res = topKFrequent(words, k);
    expect(res).toEqual(["the", "is", "sunny", "day"]);
  });
});
