import { isPathCrossing } from "./isPathCrossing";

describe("isPathCrossing", () => {
  it("case 1", () => {
    const path = "NES";
    const result = isPathCrossing(path);
    expect(result).toBe(false);
  });

  it("case 2", () => {
    const path = "NESWW";
    const result = isPathCrossing(path);
    expect(result).toBe(true);
  });
});
