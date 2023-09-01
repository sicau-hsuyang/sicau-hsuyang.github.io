import { compactObject } from "./compact-object";
describe("compact-object", () => {
  it("case 1", () => {
    const original = [null, 0, 5, [0], [false, 16]];
    const result = compactObject(original);
    expect(result).toEqual([5, [], [16]]);
  });
});
