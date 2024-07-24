import { maxProduct } from "./maxProduct";

describe("maxProduct", () => {
  it("case 1", () => {
    const nums = [3, 4, 5, 2];
    const val = maxProduct(nums);
    expect(val).toBe(120);
  });

  it("case 11", () => {
    const nums = [2, 3, -2, 4];
    const val = maxProduct(nums);
    expect(val).toBe(6);
  });

  it("case 4", () => {
    const nums = [1, 2, 3, -1, -1, 5, 1, 1];
    const val = maxProduct(nums);
    expect(val).toBe(30);
  });

  it("case 2", () => {
    const nums = [8, 8, -7, 4, -5, 8, 1, -7, -27];
    const val = maxProduct(nums);
    expect(val).toBe(49);
  });

  it("case 33", () => {
    const nums = [3, -1, 4];
    const val = maxProduct(nums);
    expect(val).toBe(4);
  });

  it("case 5", () => {
    const nums = [2, -5, -2, -4, 3];
    const val = maxProduct(nums);
    expect(val).toBe(24);
  });
});
