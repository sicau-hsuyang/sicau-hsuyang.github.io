import { numTilePossibilities } from "./numTilePossibilities";

describe("numTilePossibilities", () => {
  it("case 1", () => {
    const str = "AAB";
    const count = numTilePossibilities(str);
    expect(count).toBe(8);
  });

  it("case 2", () => {
    const str = "AAABBC";
    const count = numTilePossibilities(str);
    expect(count).toBe(188);
  });

  it("case 3", () => {
    const str = "AABCC";
    const count = numTilePossibilities(str);
    expect(count).toBe(89);
  });

  it("case 4", () => {
    const str = "ABBC";
    const count = numTilePossibilities(str);
    expect(count).toBe(34);
  });
});
