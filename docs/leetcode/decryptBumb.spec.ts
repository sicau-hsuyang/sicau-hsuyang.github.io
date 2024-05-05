import { decrypt } from "./decryptBumb";

describe("decrypt", () => {
  it("case 1", () => {
    const code = [5, 7, 1, 4],
      k = 3;
    const res = decrypt(code, k);
    expect(res).toEqual([12, 10, 16, 13]);
  });

  it("case 2", () => {
    const code = [2, 4, 9, 3],
      k = -2;
    const res = decrypt(code, k);
    expect(res).toEqual([12, 5, 6, 13]);
  });
});
