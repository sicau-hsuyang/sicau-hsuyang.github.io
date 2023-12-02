import { searchMatrix } from "./searchMatrix";

describe("search matrix", () => {
  // it("binary search case 1", () => {
  //   const nums = [1, 4, 7, 11, 15],
  //     target = 1;
  //   const res = binarySearch(nums, target);
  //   expect(res).toBe(0);
  // });

  // it("binary search case 2", () => {
  //   const nums = [1, 4, 7, 11, 15],
  //     target = 4;
  //   const res = binarySearch(nums, target);
  //   expect(res).toBe(1);
  // });

  // it("binary search case 3", () => {
  //   const nums = [1, 4, 7, 11, 15],
  //     target = 7;
  //   const res = binarySearch(nums, target);
  //   expect(res).toBe(2);
  // });

  // it("binary search case 4", () => {
  //   const nums = [1, 4, 7, 11, 15],
  //     target = 11;
  //   const res = binarySearch(nums, target);
  //   expect(res).toBe(3);
  // });

  // it("binary search case 5", () => {
  //   const nums = [1, 4, 7, 11, 15],
  //     target = 15;
  //   const res = binarySearch(nums, target);
  //   expect(res).toBe(4);
  // });

  // it("binary search case 6", () => {
  //   const nums = [1, 4, 7, 11, 15],
  //     target = 2;
  //   const res = binarySearch(nums, target);
  //   expect(res).toBe(-1);
  // });

  // it("binary search case 6", () => {
  //   const nums = [1, 4, 7, 11, 15],
  //     target = 5;
  //   const res = binarySearch(nums, target);
  //   expect(res).toBe(-1);
  // });

  // it("binary search case 6", () => {
  //   const nums = [1, 4, 7, 11, 15],
  //     target = 9;
  //   const res = binarySearch(nums, target);
  //   expect(res).toBe(-1);
  // });

  // it("binary search case 6", () => {
  //   const nums = [1, 4, 7, 11, 15],
  //     target = 12;
  //   const res = binarySearch(nums, target);
  //   expect(res).toBe(-1);
  // });

  // it("case 1", () => {
  //   const matrix = [
  //       [1, 4, 7, 11, 15],
  //       [2, 5, 8, 12, 19],
  //       [3, 6, 9, 16, 22],
  //       [10, 13, 14, 17, 24],
  //       [18, 21, 23, 26, 30],
  //     ],
  //     target = 5;
  //   const res = searchMatrix(matrix, target);
  //   expect(res).toBe(true);
  // });

  it("case 2", () => {
    const matrix = [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30],
      ],
      target = 22;
    const res = searchMatrix(matrix, target);
    expect(res).toBe(false);
  });

  it("case 3", () => {
    const matrix = [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30],
      ],
      target = 4;
    const res = searchMatrix(matrix, target);
    expect(res).toBe(true);
  });

  it("case 4", () => {
    const matrix = [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ];
    for (let i = 0; i < 100; i++) {
      const res = searchMatrix(matrix, i);
      if (res) {
        console.log({ exist: res, target: i });
      }
    }
  });

  it("case 5", () => {
    const matrix = [
        [1, 4],
        [2, 5],
      ],
      target = 3;
    const res = searchMatrix(matrix, target);
    expect(res).toBe(false);
  });

  it("case 6", () => {
    const matrix = [
        [4, 5],
        [4, 6],
        [9, 14],
        [10, 15],
      ],
      target = 7;
    const res = searchMatrix(matrix, target);
    expect(res).toBe(false);
  });
});
