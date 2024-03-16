import { maxProduct } from "./maxProduct";

describe("maxProduct", () => {
  it("case 1", () => {
    const nums = [3, 4, 5, 2];
    const val = maxProduct(nums);
    expect(val).toBe(12);
  });

  it("case 2", () => {
    const nums = [8, 8, 7, 4, 2, 8, 1, 7, 7];
    const val = maxProduct(nums);
    expect(val).toBe(49);
  });
});
