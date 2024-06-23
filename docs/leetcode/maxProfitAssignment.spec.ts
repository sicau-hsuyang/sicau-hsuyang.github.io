import { maxProfitAssignment, binarySearch } from "./maxProfitAssignment";

describe("maxProfitAssignment", () => {
  it("case 1", () => {
    const difficulty = [2, 4, 6, 8, 10],
      profit = [10, 20, 30, 40, 50],
      worker = [4, 5, 6, 7];
    const res = maxProfitAssignment(difficulty, profit, worker);
    expect(res).toBe(100);
  });

  it("case 2", () => {
    const difficulty = [85, 47, 57],
      profit = [24, 66, 99],
      worker = [40, 25, 25];
    const res = maxProfitAssignment(difficulty, profit, worker);
    expect(res).toBe(0);
  });

  it("case 3", () => {
    const difficulty = [13, 37, 58],
      profit = [4, 90, 96],
      worker = [34, 73, 45];
    const res = maxProfitAssignment(difficulty, profit, worker);
    expect(res).toBe(190);
  });

  it("case 4", () => {
    const difficulty = [68, 35, 52, 47, 86],
      profit = [67, 17, 1, 81, 3],
      worker = [92, 10, 85, 84, 82];
    const res = maxProfitAssignment(difficulty, profit, worker);
    expect(res).toBe(324);
  });

  it("case 5", () => {
    const difficulty = [5, 50, 92, 21, 24, 70, 17, 63, 30, 53],
      profit = [68, 100, 3, 99, 56, 43, 26, 93, 55, 25],
      worker = [96, 3, 55, 30, 11, 58, 68, 36, 26, 1];
    const res = maxProfitAssignment(difficulty, profit, worker);
    expect(res).toBe(765);
  });

  it("case 6", () => {
    const difficulty = [23, 30, 35, 35, 43, 46, 47, 81, 83, 98],
      profit = [8, 11, 11, 20, 33, 37, 60, 72, 87, 95],
      worker = [95, 46, 47, 97, 11, 35, 99, 56, 41, 92];
    const res = maxProfitAssignment(difficulty, profit, worker);
    expect(res).toBe(553);
  });

  it("case 7", () => {
    const difficulty = [
        66, 1, 28, 73, 53, 35, 45, 60, 100, 44, 59, 94, 27, 88, 7, 18, 83, 18,
        72, 63,
      ],
      profit = [
        66, 20, 84, 81, 56, 40, 37, 82, 53, 45, 43, 96, 67, 27, 12, 54, 98, 19,
        47, 77,
      ],
      worker = [
        61, 33, 68, 38, 63, 45, 1, 10, 53, 23, 66, 70, 14, 51, 94, 18, 28, 78,
        100, 16,
      ];
    const res = maxProfitAssignment(difficulty, profit, worker);
    expect(res).toBe(1392);
  });
});

// describe("binarySearch", () => {
//   it("case 1", () => {
//     const arr = [2, 4, 6, 8, 10];
//     const pos = binarySearch(arr, 1);
//     expect(pos).toBe(-1);
//   });

//   it("case 2", () => {
//     const arr = [2, 4, 6, 8, 10];
//     const pos = binarySearch(arr, 2);
//     expect(pos).toBe(0);
//   });

//   it("case 3", () => {
//     const arr = [2, 4, 6, 8, 10];
//     const pos = binarySearch(arr, 3);
//     expect(pos).toBe(0);
//   });

//   it("case 4", () => {
//     const arr = [2, 4, 6, 8, 10];
//     const pos = binarySearch(arr, 5);
//     expect(pos).toBe(1);
//   });

//   it("case 5", () => {
//     const arr = [2, 4, 6, 8, 10];
//     const pos = binarySearch(arr, 7);
//     expect(pos).toBe(2);
//   });

//   it("case 6", () => {
//     const arr = [2, 4, 6, 8, 10];
//     const pos = binarySearch(arr, 9);
//     expect(pos).toBe(3);
//   });
// });
