import {
  convertNumberSystem,
  calcShortLinkCode,
} from "./convert-number-system";

describe("convertNumberSystem", () => {
  it("should convert decimal to binary correctly", () => {
    expect(convertNumberSystem(10, 2)).toBe("1010");
    expect(convertNumberSystem(3242300, 26)).toBe((3242300).toString(26));
    expect(convertNumberSystem(9, 3)).toBe((9).toString(3));
    expect(convertNumberSystem(2, 3)).toBe((2).toString(3));
    expect(convertNumberSystem(100, 16)).toBe((100).toString(16));
  });

  it("should convert decimal to octal correctly", () => {
    expect(convertNumberSystem(123, 8)).toBe("173");
  });

  it("should convert decimal to hexadecimal correctly", () => {
    expect(convertNumberSystem(255, 16)).toBe("ff");
  });

  it("should throw an error when the expected radix is greater than 36", () => {
    expect(() => convertNumberSystem(123, 37)).toThrowError(
      "Convert range error, between 2 and 36"
    );
  });

  it("calc short link code", () => {
    const code1 = calcShortLinkCode(1000000000);
    const code2 = calcShortLinkCode(1000000001);
    console.log(code1, code2);
    debugger;
  });
});
