import { replaceWords } from "./replaceWords";

describe("replaceWords", () => {
  it("case 1", () => {
    const dictionary = ["cat", "bat", "rat"],
      sentence = "the cattle was rattled by the battery";
    const results = replaceWords(dictionary, sentence);
    expect(results).toBe("the cat was rat by the bat");
  });
});
