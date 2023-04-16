import { reverse } from "./reverse";

describe("reverse", () => {
  it("demo", () => {
    const node = {
      val: 1,
      next: {
        val: 2,
        next: {
          val: 3,
          next: null,
        },
      },
    };
    const newList = reverse(node);
    expect(newList).toEqual({
      val: 3,
      next: {
        val: 2,
        next: {
          val: 1,
          next: null,
        },
      },
    });
  });
});
