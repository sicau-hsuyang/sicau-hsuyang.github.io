import { findRadius } from "./findRadius";

describe("findRadius", () => {
  it("case 1", () => {
    const houses = [1, 2, 3],
      heaters = [2];
    const radius = findRadius(houses, heaters);
    expect(radius).toBe(1);
  });

  it("case 2", () => {
    const houses = [1, 2, 3, 4],
      heaters = [1, 4];
    const radius = findRadius(houses, heaters);
    expect(radius).toBe(1);
  });

  it("case 3", () => {
    const houses = [1, 2, 3, 4],
      heaters = [1, 2, 3, 4];
    const radius = findRadius(houses, heaters);
    expect(radius).toBe(0);
  });

  it("case 4", () => {
    const houses = [1, 2, 3, 4, 5, 100, 200, 3000, 4000],
      heaters = [1, 2, 3, 50, 700, 800, 20, 30, 40];
    const radius = findRadius(houses, heaters);
    expect(radius).toBe(3200);
  });

  it("case 5", () => {
    const houses = [1, 5],
      heaters = [10];
    const radius = findRadius(houses, heaters);
    expect(radius).toBe(9);
  });

  it("case 6", () => {
    const houses = [
        282475249, 622650073, 984943658, 144108930, 470211272, 101027544,
        457850878, 458777923,
      ],
      heaters = [
        823564440, 115438165, 784484492, 74243042, 114807987, 137522503,
        441282327, 16531729, 823378840, 143542612,
      ];
    const radius = findRadius(houses, heaters);
    expect(radius).toBe(161834419);
  });
});
