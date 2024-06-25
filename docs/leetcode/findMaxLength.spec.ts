import { findMaxLength } from "./findMaxLength";

describe("findMaxLength", () => {
  it("case 1", () => {
    const res = findMaxLength([0, 1]);
    expect(res).toBe(2);
  });

  it("case 2", () => {
    const res = findMaxLength([0, 1, 0]);
    expect(res).toBe(2);
  });

  it("case 3", () => {
    const res = findMaxLength([0, 0, 1, 0, 0, 0, 1, 1]);
    expect(res).toBe(6);
  });
});
