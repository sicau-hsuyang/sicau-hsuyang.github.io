import { numRescueBoats } from "./numRescueBoats";

describe("numRescueBoats", () => {
  it("case 1", () => {
    const people = [1, 2],
      limit = 3;
    const total = numRescueBoats(people, limit);
    expect(total).toBe(1);
  });

  it("case 2", () => {
    const people = [3, 2, 2, 1],
      limit = 3;
    const total = numRescueBoats(people, limit);
    expect(total).toBe(3);
  });

  it("case 3", () => {
    const people = [3, 5, 3, 4],
      limit = 5;
    const total = numRescueBoats(people, limit);
    expect(total).toBe(4);
  });

  it("case 4", () => {
    // 1 2 2 3 3 4 5
    const people = [3, 2, 1, 2, 5, 3, 4],
      limit = 5;
    const total = numRescueBoats(people, limit);
    expect(total).toBe(4);
  });
});
