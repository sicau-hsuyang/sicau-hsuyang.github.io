import { maxSumTwoNoOverlap } from "./maxSumTwoNoOverlap";

describe("maxSumTwoNoOverlap", () => {
  it("case 1", () => {
    const nums = [0, 6, 5, 2, 2, 5, 1, 9, 4],
      firstLen = 1,
      secondLen = 2;
    const total = maxSumTwoNoOverlap(nums, firstLen, secondLen);
    expect(total).toBe(20);
  });

  it("case 2", () => {
    const nums = [2, 1, 5, 6, 0, 9, 5, 0, 3, 8],
      firstLen = 4,
      secondLen = 3;
    const total = maxSumTwoNoOverlap(nums, firstLen, secondLen);
    expect(total).toBe(31);
  });

  it("case 3", () => {
    const nums = [
        2, 1, 5, 6, 0, 9, 5, 0, 3, 2, 2, 3, 1, 3, 4, 6, 8, 2, 3, 3, 8,
      ],
      firstLen = 4,
      secondLen = 3;
    const total = maxSumTwoNoOverlap(nums, firstLen, secondLen);
    expect(total).toBe(38);
  });
});
