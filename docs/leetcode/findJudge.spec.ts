import { findJudge } from "./findJudge";

describe("find judge", () => {
  it("case 1", () => {
    const n = 2,
      trust = [[1, 2]];
    const result = findJudge(n, trust);
    expect(result).toBe(2);
  });

  it("case 2", () => {
    const n = 3,
      trust = [
        [1, 3],
        [2, 3],
      ];
    const result = findJudge(n, trust);
    expect(result).toBe(3);
  });

  it("case 4", () => {
    const n = 3,
      trust = [
        [1, 2],
        [2, 3],
      ];
    const result = findJudge(n, trust);
    expect(result).toBe(3);
  });

  it("case 5", () => {
    const n = 4,
      trust = [
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [4, 3],
      ];
    const result = findJudge(n, trust);
    expect(result).toBe(3);
  });

  it("cade 6", () => {
    const n = 3,
      trust = [
        [1, 2],
        [2, 3],
      ];
    const result = findJudge(n, trust);
    expect(result).toBe(-1);
  });
});
