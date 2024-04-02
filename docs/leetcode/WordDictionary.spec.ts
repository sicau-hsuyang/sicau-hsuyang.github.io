import { WordDictionary } from "./WordDictionary";

describe("WordDictionary", () => {
  it("case 1", () => {
    const dic = new WordDictionary();
    ["bad", "dad", "mad", "daddy"].forEach((word) => {
      dic.addWord(word);
    });
    // ["bad", "dad", "mad", "daddy"].forEach((element) => {
    //   console.log(dic.search(element));
    // });
    // const flag = dic.search(".ad");
    // console.log(flag);
    // const flag2 = dic.search("b..");
    // console.log(flag2);

    [["at"], ["and"], ["an"], ["add"]].forEach(([word]) => {
      dic.addWord(word);
    });
    dic.search("a");
  });
});
