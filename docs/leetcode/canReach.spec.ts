import { canReach } from "./canReach";

describe("canReach", () => {
  it("case 1", () => {
    const arr = [3, 0, 2, 1, 2],
      start = 2;
    const flag = canReach(arr, start);
    expect(flag).toBe(false);
  });

  it("case 2", () => {
    const arr = [4, 2, 3, 0, 3, 1, 2],
      start = 5;
    const flag = canReach(arr, start);
    expect(flag).toBe(true);
  });

  it("case 3", () => {
    const arr = [4, 2, 3, 0, 3, 1, 2],
      start = 0;
    const flag = canReach(arr, start);
    expect(flag).toBe(true);
  });
});
