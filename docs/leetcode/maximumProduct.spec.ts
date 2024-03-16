import { maximumProduct } from "./maximumProduct";

describe("maximumProduct", () => {
  it("case 1", () => {
    const nums = [1, 2, 3];
    const res = maximumProduct(nums);
    expect(res).toBe(6);
  });

  it("case 2", () => {
    const nums = [1, 2, 3, 4];
    const res = maximumProduct(nums);
    expect(res).toBe(24);
  });

  it("case 3", () => {
    const nums = [3, 4, 0, 0, -1, -5];
    const res = maximumProduct(nums);
    expect(res).toBe(20);
  });
});
