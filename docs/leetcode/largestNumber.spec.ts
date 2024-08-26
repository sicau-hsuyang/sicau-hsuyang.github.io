import { largestNumber } from "./largestNumber";

describe("largestNumber", () => {
  it("case 1", () => {
    // 3033
    // 3303
    const nums = [3, 30, 34, 5, 9];
    const val = largestNumber(nums);
    console.log(val);
  });

  it("case 2", () => {
    const nums = [3, 30, 34, 45, 2, 49, 98, 76, 29, 19, 87, 199, 5, 9];
    const val = largestNumber(nums);
    console.log(val);
  });

  it("case 3", () => {
    const nums = [9, 98];
    const val = largestNumber(nums);
    console.log(val);
  });

  it("case 4", () => {
    const nums = [98, 9];
    const val = largestNumber(nums);
    console.log(val);
  });

  it("case 6", () => {
    const nums = [
      26, 0, 56, 92, 82, 15, 78, 26, 95, 58, 36, 52, 20, 45, 33, 64, 94, 22, 22,
      82, 43, 53, 27, 21, 46, 30, 6, 99, 11, 78, 45, 57, 33, 6, 27, 52, 10, 54,
      12, 37, 12, 99, 68, 41, 66, 67, 36, 73, 1, 73, 58, 19, 78, 21, 44, 77, 73,
      57, 0, 42, 48, 89, 21, 7, 49, 75, 45, 99, 86, 18, 55, 17, 53, 78, 30, 9,
      53, 2, 53, 18, 28, 84, 73, 33, 10, 14, 66, 99, 81, 93, 59, 94, 23, 64, 71,
      60, 94, 79, 73, 18,
    ];
    const val = largestNumber(nums);
    console.log(val);
  });

  it("case 7", () => {
    const nums = [34323, 3432];
    // 34323 343233432
    // 3432  343234323
    // 34329
    // 3432  343293432
    //       343234329
    const val = largestNumber(nums);
    console.log(val);
  });

  it("case 8", () => {
    const nums = [432, 43243];
    // 43243 432 || 43243432
    // 432 43243 || 43243243
    const val = largestNumber(nums);
    expect(val).toBe('43243432')
    console.log(val);
  });

  it("case 9", () => {
    const nums = [999999991, 9];
    // 43243 432 || 43243432
    // 432 43243 || 43243243
    const val = largestNumber(nums);
    // 99999991
    // 9
    expect(val).toBe('9999999991')
    console.log(val);
  });

  it("case 10", () => {
    // 8308830
    // 8308038
    const nums = [8308, 8308, 830];
    const val = largestNumber(nums);
    expect(val).toBe('83088308830')
    console.log(val);
    console.log(val);
  });
});
