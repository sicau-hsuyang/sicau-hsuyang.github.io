import { memoize } from "./memoize";

describe("memoize unit test", () => {
  it("case 1", () => {
    var counter = 0;
    function add(...args: number[]) {
      counter++;
      return args.reduce((accumulate: number, cur: number) => {
        return accumulate + cur;
      });
    }

    const memoizeAdd = memoize(
      add,
      (...args: number[]) => JSON.stringify(args),
      2
    );

    memoizeAdd(1, 2, 3, 4);
    memoizeAdd(1, 2, 3);
    memoizeAdd(1, 2);
    memoizeAdd(1, 2, 3, 4);
    expect(counter).toBe(4);
  });

  it("case 2", () => {
    var counter = 0;
    function add(...args: number[]) {
      counter++;
      return args.reduce((accumulate: number, cur: number) => {
        return accumulate + cur;
      });
    }

    const memoizeAdd = memoize(
      add,
      (...args: number[]) => JSON.stringify(args),
      2
    );

    memoizeAdd(1, 2, 3, 4);
    memoizeAdd(1, 2, 3, 4);
    memoizeAdd(1, 2, 3);
    memoizeAdd(1, 2, 3, 4);
    expect(counter).toBe(2);
  });

  it("case 3", () => {
    var counter = 0;
    function add(...args: number[]) {
      counter++;
      return args.reduce((accumulate: number, cur: number) => {
        return accumulate + cur;
      });
    }

    const memoizeAdd = memoize(
      add,
      (...args: number[]) => JSON.stringify(args),
      2
    );

    memoizeAdd(1, 2, 3, 4);
    memoizeAdd(1, 2, 3, 4);
    memoizeAdd(1, 2, 3);
    memoizeAdd(1, 2);
    memoizeAdd(1, 2, 3);
    memoizeAdd(1, 2, 3, 4);
    expect(counter).toBe(4);
  });
});
