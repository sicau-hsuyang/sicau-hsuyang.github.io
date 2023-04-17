import { isHappy } from "./isHappy";

describe("is happy", () => {
  it("case 1", () => {
    const flag = isHappy(19);
    expect(flag).toBe(true);
  });

  it("case 2", () => {
    const flag = isHappy(2);
    expect(flag).toBe(false);
  });
});
