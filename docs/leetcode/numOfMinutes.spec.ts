import { numOfMinutes } from "./numOfMinutes";

describe("num of minutes", () => {
  it("case 1", () => {
    const speedTime = numOfMinutes(
      15,
      0,
      [-1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    expect(speedTime).toBe(3);
  });

  it("case 2", () => {
    const speedTime = numOfMinutes(
      6,
      2,
      [2, 2, -1, 2, 2, 2],
      [0, 0, 1, 0, 0, 0]
    );
    expect(speedTime).toBe(1);
  });

  it("case 3", () => {
    const speedTime = numOfMinutes(1, 0, [-1], [0]);
    expect(speedTime).toBe(0);
  });
});
