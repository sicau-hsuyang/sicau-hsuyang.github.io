import { add } from "./add";
describe("add function", () => {
  test("adds two strings of digits correctly", () => {
    expect(add("123", "456")).toBe("579");
    expect(add("999", "1")).toBe("1000");
    expect(add("888", "12")).toBe("900");
    expect(add("1234", "56789")).toBe("58023");
  });

  test("returns '0' if both arguments are '0'", () => {
    expect(add("0", "0")).toBe("0");
  });

  test("1 + 99999999", () => {
    expect(add("1", "99999999")).toBe("100000000");
  })
});
