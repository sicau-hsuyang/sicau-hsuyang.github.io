import { checkIfExist } from "./checkIfExist";

describe("checkIfExist", () => {
  it("case 1", () => {
    const arr = [10, 2, 5, 3];
    const flag = checkIfExist(arr);
    expect(flag).toBe(true);
  });
});
