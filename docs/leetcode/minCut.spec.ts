import { minCut } from "./minCut";

describe("minCut", () => {
  it("case 1", () => {
    const s = "aab";
    const count = minCut(s);
    console.log(count);
  });

  it("case 2", () => {
    const s = "aabbaaaa";
    const count = minCut(s);
    console.log(count);
  });
});
