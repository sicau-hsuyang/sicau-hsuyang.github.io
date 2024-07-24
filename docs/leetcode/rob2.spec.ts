import { rob } from "./rob2";

describe("rob", () => {
  it("case 1", () => {
    const nums = [4, 2, 3, 100];
    const val = rob(nums);
    console.log(val);
  });

  it("case 2", () => {
    const nums = [4];
    const val = rob(nums);
    console.log(val);
  });

  it("case 3", () => {
    const nums = [4, 6];
    const val = rob(nums);
    console.log(val);
  });

  it('case 5', () => {
    const nums = [40, 38, 97, 99, 20, 37, 41, 65, 5, 59, 36, 64, 74, 90, 95, 94, 73, 21, 96, 68, 17, 84, 58, 68, 8, 54, 53, 91, 62, 85, 66, 96, 80, 61, 65, 78, 31, 25, 50, 52, 29, 12, 90, 61, 2, 43, 84, 48, 96, 43, 97, 31, 76, 68, 57, 16, 81, 15, 2, 36, 94, 65, 20, 67, 37, 38, 1, 48, 84, 61, 13, 39, 52, 97, 33, 59, 11, 38, 70, 86, 44, 61, 40, 94, 61, 24, 29, 96, 21, 78, 51, 55, 63, 16, 78, 46, 96, 84, 7, 18]
    const val = rob(nums);
    console.log(val);
  })
});
