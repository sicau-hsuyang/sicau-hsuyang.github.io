import { trap } from "./trap_1";

describe("trap", () => {
  it("case 1", () => {
    const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    const total = trap(height);
    expect(total).toBe(6);
  });
});
