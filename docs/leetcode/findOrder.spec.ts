import { findOrder } from "./findOrder";

describe("find order", () => {
  it("case 1", () => {
    const numCourses = 2,
      prerequisites = [[1, 0]];
    const res = findOrder(numCourses, prerequisites);
    expect(res).toEqual([0, 1]);
  });

  it("case 2", () => {
    const numCourses = 4,
      prerequisites = [
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
      ];
    const res = findOrder(numCourses, prerequisites);
    expect(res).toEqual([0, 2, 1, 3]);
  });
});
