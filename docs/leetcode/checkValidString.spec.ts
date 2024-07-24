import { checkValidString } from "./checkValidString";

describe("checkValidString", () => {
  it("case 1", () => {
    const t1 = Date.now();
    const s =
      "((((())(**)))((((*(*(*)((*)*((*))*))*)**(*((()((*()))((*))**)(()*(((*(***()*)*)()()()*)()((((*)()(()";
    //
    console.log(s.length);
    const val = checkValidString(s);
    const t2 = Date.now();
    console.log(val);
    console.log(t2 - t1, "耗时");
  });

  it("case 3", () => {
    const s = "((*))**)";
    const res = checkValidString(s);
    console.log(res);
  });

  it("case 4", () => {
    const s = "(*))";
    const res = checkValidString(s);
    console.log(res);
  });

  it("case 2", () => {
    const t1 = Date.now();
    const s = "(*()))((*))**)(()*(((*(***()*)*)()()";
    checkValidString(s);
    const t2 = Date.now();
    console.log("耗时:" + (t2 - t1));
  });
});
