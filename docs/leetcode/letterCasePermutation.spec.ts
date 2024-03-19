import { letterCasePermutation } from "./letterCasePermutation";

describe("letterCasePermutation", () => {
  it("case 1", () => {
    const s = "a1b2";
    const results = letterCasePermutation(s);
    console.log(results);
  });

  it("case 2", () => {
    const s = "C";
    const results = letterCasePermutation(s);
    console.log(results);
  });
});
