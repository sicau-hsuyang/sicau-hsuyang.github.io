import { wateringPlants } from "./wateringPlants";

describe("wateringPlants", () => {
  it("case 1", () => {
    const plants = [2, 2, 3, 3],
      capacity = 5;
    const total = wateringPlants(plants, capacity);
    expect(total).toBe(14);
  });
});
