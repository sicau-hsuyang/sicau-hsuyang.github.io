import { shortestToChar } from "./shortestToChar";

describe("shortestToChar", () => {
  it("case 1", () => {
    const s = "loveleetcode",
      c = "e";
    const res = shortestToChar(s, c);
    expect(res).toEqual([3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]);
  });

  it("case 2", () => {
    const s = "aaab",
      c = "b";
    const res = shortestToChar(s, c);
    expect(res).toEqual([3, 2, 1, 0]);
  });

  it("case 3", () => {
    const s = "baaa";
    const c = "b";
    const res = shortestToChar(s, c);
    expect(res).toEqual([0, 1, 2, 3]);
  });
});
