import { compress } from "./compress";

describe("compress string", () => {
  it("case 1", () => {
    const chars = ["a", "a", "b", "b", "c", "c", "c"];
    const res = compress(chars);
    expect(res).toBe(6);
    expect(chars.length).toBe(6);
    expect(chars).toEqual(["a", "2", "b", "2", "c", "3"]);
  });

  it("case 2", () => {
    const chars = ["a"];
    const res = compress(chars);
    expect(res).toBe(1);
    expect(chars.length).toBe(1);
    expect(chars).toEqual(["a"]);
  });

  it("case 3", () => {
    const chars = [
      "a",
      "b",
      "b",
      "b",
      "b",
      "b",
      "b",
      "b",
      "b",
      "b",
      "b",
      "b",
      "b",
    ];
    const res = compress(chars);
    expect(res).toBe(4);
    expect(chars.length).toBe(4);
    expect(chars).toEqual(["a", "b", "1", "2"]);
  });

  it("case 4", () => {
    const chars = ["a", "a", "a", "a"];
    const res = compress(chars);
    expect(res).toBe(2);
    expect(chars.length).toBe(2);
    expect(chars).toEqual(["a", "4"]);
  });

  it("case 5", () => {
    const chars = ["a", "b", "a", "b", "a"];
    const res = compress(chars);
    expect(res).toBe(5);
    expect(chars.length).toBe(5);
    expect(chars).toEqual(["a", "b", "a", "b", "a"]);
  });
});
