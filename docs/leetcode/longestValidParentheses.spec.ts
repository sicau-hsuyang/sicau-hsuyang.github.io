import { longestValidParentheses } from "./longestValidParentheses";

describe("longestValidParentheses", () => {
  it("case 1", () => {
    const s = "(())))()(())(()(()))";
    const res = longestValidParentheses(s);
    console.log(res);
  });
  
  it("case 2", () => {
    const s = '((()(())))'
    const res = longestValidParentheses(s);
    console.log(res);
  })
});

/**
 

(()(()))

 * 
 */
