import { numberOfSubstrings } from "./numberOfSubstrings";

describe("numberOfSubstrings", () => {
  it("case 1", () => {
    const s = "abcabc";
    const total = numberOfSubstrings(s);
    expect(total).toBe(10);
  });

  it("case 2", () => {
    const s = "aaacb";
    const total = numberOfSubstrings(s);
    expect(total).toBe(3);
  });
});
