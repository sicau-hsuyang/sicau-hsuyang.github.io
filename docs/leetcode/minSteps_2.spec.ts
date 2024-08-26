import { minSteps } from "./minSteps_2";

describe("minSteps", () => {
  it("case 1", () => {
    const s = "leetcode",
      t = "coats";
    const step = minSteps(s, t);
    expect(step).toBe(7);
  });

  it("case 2", () => {
    const s = "night",
      t = "thing";
    const step = minSteps(s, t);
    expect(step).toBe(0);
  });
});
