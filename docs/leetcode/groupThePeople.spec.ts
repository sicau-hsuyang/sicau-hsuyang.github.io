import { groupThePeople } from "./groupThePeople";

describe("group the people", () => {
  it("unit test 1", () => {
    const res = groupThePeople([3, 3, 3, 3, 3, 1, 3]);
    expect(res).toContain([5]);
    expect(res).toContain([0, 1, 2]);
    expect(res).toContain([3, 4, 6]);
    expect(res.length).toBe(3);
  });
});
