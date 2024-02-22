import { addToArrayForm } from "./addToArrayForm";

describe("add to array form", () => {
  it("case 1", () => {
    const num = [2, 7, 4],
      k = 181;
    const res = addToArrayForm(num, k);
    expect(res).toEqual([4, 5, 5]);
  });

  it("case 2", () => {
    const num = [9, 9, 9],
      k = 1;
    const res = addToArrayForm(num, k);
    expect(res).toEqual([1, 0, 0, 0]);
  });

  it("case 3", () => {
    const num = [1],
      k = 999;
    const res = addToArrayForm(num, k);
    expect(res).toEqual([1, 0, 0, 0]);
  });
});
