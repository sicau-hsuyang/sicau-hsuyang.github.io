import { canPartition } from "./canPartition";

describe("canPartition", () => {
  it("case 1", () => {
    const arr = [1, 5, 11, 5];
    const flag = canPartition(arr);
    expect(flag).toBe(true);
  });

  it("case 2", () => {
    const arr = [1, 2, 3, 5];
    const flag = canPartition(arr);
    expect(flag).toBe(false);
  });

  it("case 3", () => {
    const arr = [1, 4, 101, 9, 3];
    const flag = canPartition(arr);
    expect(flag).toBe(false);
  });

  it("case 4", () => {
    const arr = [1, 1];
    const flag = canPartition(arr);
    expect(flag).toBe(true);
  });

  it("case 5", () => {
    const arr = [3, 3, 3, 4, 5];
    const flag = canPartition(arr);
    expect(flag).toBe(true);
  });
});
