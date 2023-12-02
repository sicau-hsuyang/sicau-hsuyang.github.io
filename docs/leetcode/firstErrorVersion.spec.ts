import { solution } from "./firstErrorVersion";

describe("first error version", () => {
  function isBadVersion(target: number) {
    return (num: number) => num >= target;
  }

  it("test 1", () => {
    const n = 5,
      bad = 4;
    const exec = solution(isBadVersion(bad));
    const res = exec(n);
    expect(res).toBe(4);
  });

  it("test 2", () => {
    const n = 5,
      bad = 1;
    const exec = solution(isBadVersion(bad));
    const res = exec(n);
    expect(res).toBe(1);
  });

  it("test 3", () => {
    const n = 5,
      bad = 2;
    const exec = solution(isBadVersion(bad));
    const res = exec(n);
    expect(res).toBe(2);
  });

  it("test 4", () => {
    const n = 5,
      bad = 3;
    const exec = solution(isBadVersion(bad));
    const res = exec(n);
    expect(res).toBe(3);
  });

  it("test 5", () => {
    const n = 5,
      bad = 5;
    const exec = solution(isBadVersion(bad));
    const res = exec(n);
    expect(res).toBe(5);
  });

  it("test 6", () => {
    const n = 1,
      bad = 1;
    const exec = solution(isBadVersion(bad));
    const res = exec(n);
    expect(res).toBe(1);
  });
});
