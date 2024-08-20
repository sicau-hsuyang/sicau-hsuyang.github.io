import { minSteps } from "./minSteps";

describe("minSteps", () => {
  it("case 1", () => {
    const s = "bab",
      t = "aba";
    const C = minSteps(s, t);
    console.log(C);
  });

  it("case 2", () => {
    const s = "leetcode", t = "practice"
    const C = minSteps(s, t);
    console.log(C);
  })
});
