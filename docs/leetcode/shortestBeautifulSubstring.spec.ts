import { shortestBeautifulSubstring } from "./shortestBeautifulSubstring";

describe("shortestBeautifulSubstring", () => {
  it("case 1", () => {
    const s = "100011001",
      k = 3;
    const str = shortestBeautifulSubstring(s, k);
    expect(str).toBe("11001");
  });

  it("case2", () => {
    const s = "1011",
      k = 2;
    const str = shortestBeautifulSubstring(s, k);
    expect(str).toBe("11");
  });

  it("case 3", () => {
    const s = "11000111",
      k = 1;
    const str = shortestBeautifulSubstring(s, k);
    expect(str).toBe("1");
  });

  it("case 4", () => {
    const s = "01011101000111110",
      k = 5;
    const str = shortestBeautifulSubstring(s, k);
    expect(str).toBe("11111");
  });

  it("case 5", () => {
    const s = "001",
      k = 1;
    const str = shortestBeautifulSubstring(s, k);
    expect(str).toBe("1");
  });

  it("case 6", () => {
    const s = "001110101101101111",
      k = 10;
    const str = shortestBeautifulSubstring(s, k);
    expect(str).toBe("10101101101111");
  });
});
