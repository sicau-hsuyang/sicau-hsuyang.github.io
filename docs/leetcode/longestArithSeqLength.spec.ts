import { longestArithSeqLength } from "./longestArithSeqLength";

describe("longestArithSeqLength", () => {
  it("case 1", () => {
    const nums = [3, 6, 9, 12];
    const len = longestArithSeqLength(nums);
    expect(len).toBe(4);
  });
});
