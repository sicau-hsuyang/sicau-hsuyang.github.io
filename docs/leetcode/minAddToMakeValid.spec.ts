import { minAddToMakeValid } from "./minAddToMakeValid";

describe("minAddToMakeValid", () => {
  it("case 1", () => {
    const s = "())";
    minAddToMakeValid(s);
  });

  it("case 2", () => {
    const s = "())(()()(()()())()()(())()";
    minAddToMakeValid(s);
  });
});
