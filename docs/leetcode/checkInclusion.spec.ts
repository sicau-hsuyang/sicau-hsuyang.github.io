import { checkInclusion } from "./checkInclusion";

describe("checkInclusion", () => {
  it("case 1", () => {
    const s1 = "ab",
      s2 = "eidbaooo";
    const flag = checkInclusion(s1, s2);
    expect(flag).toBe(true);
  });

  it("case 3", () => {
    const s1 = "adc",
      s2 = "dcda";
    const flag = checkInclusion(s1, s2);
    expect(flag).toBe(true);
  });

  it("case 4", () => {
    const s1 = "hello",
      s2 = "ooolleoooleh";
    const flag = checkInclusion(s1, s2);
    expect(flag).toBe(false);
  })
});
