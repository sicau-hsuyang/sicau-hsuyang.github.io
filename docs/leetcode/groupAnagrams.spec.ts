import { groupAnagrams } from "./groupAnagrams";

describe("group anagrams", () => {
  it("case 1", () => {
    const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
    const res = groupAnagrams(strs);
    expect(res.sort((a, b) => a.length - b.length)).toEqual([
      ["bat"],
      ["nat", "tan"],
      ["ate", "eat", "tea"],
    ]);
  });
});
