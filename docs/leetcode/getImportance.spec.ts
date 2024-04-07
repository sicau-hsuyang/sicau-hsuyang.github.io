import { Employee, getImportance } from "./getImportance";

describe("getImportance", () => {
  it("case 1", () => {
    const infos = [
      [1, 5, [2, 3]],
      [2, 3, []],
      [3, 3, []],
    ];
    const id = 1;
    const weight = getImportance(
      infos.map((v) => {
        return new Employee(v[0] as number, v[1] as number, v[2] as number[]);
      }),
      id
    );
    expect(weight).toBe(11);
  });

  it("case 2", () => {
    const infos = [
      [101, 3, []],
      [2, 5, [101]],
    ];
    const id = 2;
    const weight = getImportance(
      infos.map((v) => {
        return new Employee(v[0] as number, v[1] as number, v[2] as number[]);
      }),
      id
    );
    expect(weight).toBe(8);
  });
});
