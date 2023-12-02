import { carPooling } from "./carPooling";

describe("car pooling", () => {
  it("case 1", () => {
    const trips = [
        [2, 1, 5],
        [3, 3, 7],
      ],
      capacity = 4;
    const res = carPooling(trips as Array<[number, number, number]>, capacity);
    expect(res).toBe(false);
  });

  it("case 2", () => {
    const trips = [
        [2, 1, 5],
        [3, 3, 7],
      ],
      capacity = 5;
    const res = carPooling(trips as Array<[number, number, number]>, capacity);
    expect(res).toBe(true);
  });

  it("case 3", () => {
    const trips = [
        [2, 1, 5],
        [3, 5, 7],
      ],
      capacity = 3;
    const res = carPooling(trips as Array<[number, number, number]>, capacity);
    expect(res).toBe(true);
  });

  it("case 4", () => {
    const trips = [
        [7, 5, 6],
        [6, 7, 8],
        [10, 1, 6],
      ],
      capacity = 16;
    const res = carPooling(trips as Array<[number, number, number]>, capacity);
    expect(res).toBe(false);
  });

  it("case 5", () => {
    const trips = [
        [4, 3, 4],
        [3, 2, 4],
        [1, 8, 9],
        [7, 2, 5],
      ],
      capacity = 14;
    const res = carPooling(trips as Array<[number, number, number]>, capacity);
    expect(res).toBe(true);
  });
});
