import { maxPower } from "./maxPower";

describe("maxPower", () => {
  it("case 1", () => {
    const str = "leetcode";
    const len = maxPower(str);
    expect(len).toBe(2);
  });
});
