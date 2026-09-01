import { longestArithSeqLength } from "./longestArithSeqLength";

describe("longestArithSeqLength", () => {
  it("case 1", () => {
    const nums = [3, 6, 9, 12];
    const len = longestArithSeqLength(nums);
    expect(len).toBe(4);
  });

  it("case 2", () => {
    const nums = [3, 6, 9, 12, 9, 3, 5, 4, 9, 9, 9, 2, 1, 0, 9];
    const len = longestArithSeqLength(nums);
    expect(len).toBe(6);
  });
});
