import { maxTurbulenceSize } from "./maxTurbulenceSize";

describe("maxTurbulenceSize", () => {
  it("case 1", () => {
    const arr = [9, 4, 2, 10, 7, 8, 8, 1, 9];
    const len = maxTurbulenceSize(arr);
    expect(len).toBe(5);
  });

  it("case 2", () => {
    const arr = [4, 8, 12, 16];
    const len = maxTurbulenceSize(arr);
    expect(len).toBe(2);
  });
});
