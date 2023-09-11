import { canFinish } from "./canFinish";

describe("topological sort course can finish", () => {
  it("case 1", () => {
    const numCourses = 2,
      prerequisites = [[1, 0]];
    const res = canFinish(numCourses, prerequisites);

    expect(res).toBe(true);
  });

  it("case 2", () => {
    const numCourses = 2,
      prerequisites = [
        [1, 0],
        [0, 1],
      ];
    const res = canFinish(numCourses, prerequisites);
    expect(res).toBe(false);
  });

  it("case 3", () => {
    const numCourses = 5,
      prerequisites = [
        [1, 4],
        [2, 4],
        [3, 1],
        [3, 2],
      ];

    const res = canFinish(numCourses, prerequisites);
    expect(res).toBe(true);
  });
});
