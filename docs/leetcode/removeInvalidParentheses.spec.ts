import { removeInvalidParentheses } from "./removeInvalidParentheses";

describe("removeInvalidParentheses", () => {
  it("Case 1", () => {
    const s = "()())()";
    // const s = "()()()"
    const res = removeInvalidParentheses(s);
    console.log(res);
  });

  it("Case 2", () => {
    const s = ")(";
    const res = removeInvalidParentheses(s);
    console.log(res);
  });

  it("case 3", () => {
    const s = "n";
    const res = removeInvalidParentheses(s);
    console.log(res);
  });

  it("case 4", () => {
    const s = "(n()(k))";
    const res = removeInvalidParentheses(s);
    console.log(res);
  });

  it("case 5", () => {
    const s = "(j))(";
    const res = removeInvalidParentheses(s);
    console.log(res);
  });

  it("case 6", () => {
    const s = "()()()sxx(()d))(fg)(x)()"
    const res = removeInvalidParentheses(s);
    console.log(res);
  })
});
