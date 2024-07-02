import { checkValidString } from "./checkValidString";

describe("checkValidString", () => {
  it("case 1", () => {
    const s =
      "((((())(**)))((((*(*(*)((*)*((*))*))*)**(*((()((*()))((*))**)(()*(((*(***()*)*)()()()*)()((((*)()(()";
    checkValidString(s);
  });

  it("case 3", () => {
    const s = "((*))**)";
    checkValidString(s);
  });

  it("case 4", () => {
    const s = "(*))";
    checkValidString(s);
  });

  it("case 2", () => {
    const s = "(*()))((*))**)(()*(((*(***()*)*)()()";
    checkValidString(s);
  });
});
