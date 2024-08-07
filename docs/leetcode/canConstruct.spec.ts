import { canConstruct } from "./canConstruct";

describe("canConstruct", () => {
  it("case 1", () => {
    const s = "leetcode",
      k = 3;
    const res = canConstruct(s, k);
    console.log(res);
  });

  it("case 2", () => {
    const s = "annabelle",
      k = 2;
    const res = canConstruct(s, k);
    console.log(res);
  });

  it("case 3", () => {
    const s = "yzyzyzyzyzyzyzy",
      k = 2;
    const res = canConstruct(s, k);
    console.log(res);
  });
});
