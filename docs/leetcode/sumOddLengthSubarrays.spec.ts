import { sumOddLengthSubarrays } from "./sumOddLengthSubarrays";

describe("sumOddLengthSubarrays", () => {
  it("case 1", () => {
    const sum = sumOddLengthSubarrays([1, 4, 2, 5, 3]);
    expect(sum).toBe(58);
  });
});
