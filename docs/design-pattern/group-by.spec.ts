import { groupBy } from "./group-by";

describe("group by test", () => {
  it("group age", () => {
    const list = [
      {
        name: "wangwu",
        age: 12,
      },
      {
        name: "zhangsan",
        age: 12,
      },
      {
        name: "lisi",
        age: 18,
      },
      {
        name: "zhaosi",
        age: 17,
      },
    ];
    const res = groupBy(list, "age");
    expect(res).toEqual({
      12: [
        {
          name: "wangwu",
          age: 12,
        },
        {
          name: "zhangsan",
          age: 12,
        },
      ],
      18: [
        {
          name: "lisi",
          age: 18,
        },
      ],
      17: [
        {
          name: "zhaosi",
          age: 17,
        },
      ],
    });
  });

  it("group by age+gender", () => {
    type Person = { name: string; age: number; gender: string };
    const list: Person[] = [
      {
        name: "wangwu",
        age: 12,
        gender: "male",
      },
      {
        name: "zhangsan",
        age: 12,
        gender: "female",
      },
      {
        name: "lisi",
        age: 18,
        gender: "female",
      },
      {
        name: "zhaosi",
        age: 17,
        gender: "male",
      },
      {
        name: "Alice",
        age: 18,
        gender: "female",
      },
    ];
    const res = groupBy(list, (item: Person) => {
      return item.age + "+" + item.gender;
    });
    expect(Object.keys(res).length).toBe(4);
  });

  it("group by basic type", () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];
    const res = groupBy(nums, (item) => {
      return item % 2 !== 0 ? "odd" : "even";
    });
    expect(res).toEqual({
      odd: [1, 3, 5, 7],
      even: [2, 4, 6, 8],
    });
  });
});
