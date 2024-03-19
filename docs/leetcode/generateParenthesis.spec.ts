import { generateParenthesis } from "./generateParenthesis";

describe("generateParenthesis", () => {
  it("case 1", () => {
    const n = 3;
    const results = generateParenthesis(n);
    console.log(results);
  });

  it("case 2", () => {
    const n = 4;
    const results = generateParenthesis(n);
    console.log(results);
  });
});
