import { longestConsecutive } from "./longestConsecutive";

describe("longestConsecutive", () => {
  it("case 1", () => {
    const nums = [100, 4, 200, 1, 3, 2];
    longestConsecutive(nums);
  });

  it("case 2", () => {
    const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
    longestConsecutive(nums);
  });
});
