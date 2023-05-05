import { findMatrix } from "./findMatrix";

describe("find matrix", () => {
  it("unit test", () => {
    const res = findMatrix([1, 3, 4, 1, 2, 3, 1]);
    expect(res.length).toBe(3);
    expect(res[0].length).toBe(4);
    expect(res[0]).toContain(1);
    expect(res[0]).toContain(2);
    expect(res[0]).toContain(3);
    expect(res[0]).toContain(4);
    expect(res[1].length).toBe(2);
    expect(res[1]).toContain(1);
    expect(res[1]).toContain(3);
  });
});
