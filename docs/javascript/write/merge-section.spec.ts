import { mergeSection } from "./merge-section";

describe("merge section", () => {
  it("case", () => {
    const res = mergeSection([1, 2, 3, 4, 6, 7, 9, 13, 15]);
    expect(res).toEqual(["1->4", "6->7", "9", "13", "15"]);
  });
});
