import { minimumCardPickup } from "./minimumCardPickup";

describe("minimumCardPickup", () => {
  it("case 1", () => {
    const cards = [3, 4, 2, 3, 4, 7];
    const len = minimumCardPickup(cards);
    expect(len).toBe(4);
  });

  it("case 2", () => {
    const cards = [1, 0, 5, 3];
    const len = minimumCardPickup(cards);
    expect(len).toBe(-1);
  });

  it("case 3", () => {
    const cards = [1, 1];
    const len = minimumCardPickup(cards);
    expect(len).toBe(2);
  });

  it("case 4", () => {
    const cards = [1, 1, 2, 3, 4, 5, 1, 2];
    const len = minimumCardPickup(cards);
    expect(len).toBe(2);
  });

  it("case 5", () => {
    const cards = [
      95, 11, 8, 65, 5, 86, 30, 27, 30, 73, 15, 91, 30, 7, 37, 26, 55, 76, 60,
      43, 36, 85, 47, 96, 6,
    ];
    const len = minimumCardPickup(cards);
    expect(len).toBe(3);
  });
});
