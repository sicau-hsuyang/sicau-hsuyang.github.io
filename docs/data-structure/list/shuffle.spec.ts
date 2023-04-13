import { shuffle } from "./shuffle";
describe("shuffle function", () => {
  test("returns an array", () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    expect(Array.isArray(arr)).toBe(true);
  });

  test("returns an array with the same length as the input array", () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    expect(arr.length).toBe(3);
  });

  test("returns an array with all elements from the input array", () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    expect(arr).toContain(1);
    expect(arr).toContain(2);
    expect(arr).toContain(3);
  });

  test("returns an array with elements in a different order than the input array", () => {
    const arr = [1, 2, 3];
    const originalArr = [...arr];
    shuffle(arr);
    expect(arr).not.toEqual(originalArr);
  });
});
