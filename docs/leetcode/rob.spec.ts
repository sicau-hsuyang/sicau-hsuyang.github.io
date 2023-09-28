import { rob } from "./rob";

describe("rob", () => {
  it("case 1", () => {
    const nums = [1, 2, 3, 1];
    const res = rob(nums);
    expect(res).toBe(4);
  });

  it("case 2", () => {
    const numes = [2, 7, 9, 3, 1];
    const res = rob(numes);
    expect(res).toBe(12);
  });

  it("case 3", () => {
    const nums = [2, 1, 1, 2];
    const res = rob(nums);
    expect(res).toBe(4);
  });

  it("case 4", () => {
    const nums = [1,2,3,3,100,2,5, 3, 2,1, 40,1]
    const res = rob(nums);
    expect(res).toBe(151);
  })
});
