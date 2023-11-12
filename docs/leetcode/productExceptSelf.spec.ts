import { productExceptSelf } from "./productExceptSelf";

describe("productExceptSelf", () => {
  it("case 1", () => {
    const results = productExceptSelf([1, 2, 3, 4]);
    expect(results).toEqual([24, 12, 8, 6]);
  });

  it("case 2", () => {
    // [-1, -1 , 0, 0 ,0]
    const results = productExceptSelf([-1, 1, 0, -3, 3]);
    expect(results).toEqual([0, 0, 9, 0, 0]);
  });

  it("case 3", () => {
    const results = productExceptSelf([-1, 1, 0, -3, 3, 0]);
    expect(results).toEqual([0, 0, 0, 0, 0, 0]);
  });
});
