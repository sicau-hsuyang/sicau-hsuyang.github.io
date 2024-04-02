import { MagicDictionary } from "./MagicDictionary";

describe("MagicDictionary", () => {
  it("case 1", () => {
    const dic = new MagicDictionary();
    dic.buildDict(["hello", "leetcode"]);
    [["hello"], ["hhllo"], ["hell"], ["leetcoded"]].forEach(([word]) => {
      const flag = dic.search(word);
      console.log(flag);
    });
  });
});
