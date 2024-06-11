import { minTime } from "./minTime";

describe("minTime", () => {
  it("case 1", () => {
    const n = 7,
      edges = [
        [0, 1],
        [0, 2],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 6],
      ],
      hasApple = [false, false, true, false, true, true, false];
    const total = minTime(n, edges, hasApple);
    expect(total).toBe(8);
  });

  it("case 2", () => {
    const n = 7,
      edges = [
        [0, 1],
        [0, 2],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 6],
      ],
      hasApple = [false, false, true, false, false, true, false];
    const total = minTime(n, edges, hasApple);
    expect(total).toBe(6);
  });

  it("case 3", () => {
    const n = 7,
      edges = [
        [0, 1],
        [0, 2],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 6],
      ],
      hasApple = [false, false, false, false, false, false, false];
    const total = minTime(n, edges, hasApple);
    expect(total).toBe(0);
  });

  it("case 4", () => {
    const n = 7,
      edges = [
        [0, 1],
        [0, 2],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 6],
      ],
      hasApple = [false, false, true, true, true, true, false];
    const total = minTime(n, edges, hasApple);
    expect(total).toBe(10);
  });

  it("case 5", () => {
    const n = 7,
      edges = [
        [0, 1],
        [0, 2],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 6],
      ],
      hasApple = [true, false, false, false, false, false, false];
    const total = minTime(n, edges, hasApple);
    expect(total).toBe(0);
  });

  it("case 6", () => {
    const n = 1,
      edges = [],
      hasApple = [true];
    const total = minTime(n, edges, hasApple);
    expect(total).toBe(0);
  });
});
