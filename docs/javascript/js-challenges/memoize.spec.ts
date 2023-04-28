import { memoize } from "./memoize";

describe("memoize", () => {
  it("case 1", () => {
    const getInput = () => [
      [2, 2],
      [2, 2],
      [1, 2],
    ];
    let counter = 0;
    function add(a, b) {
      counter++;
      return a + b;
    }

    const memoAdd = memoize(add);

    const params = getInput();

    const response = params.map((v) => {
      return memoAdd.apply(this, v);
    });

    expect(counter).toBe(2);
    expect(response[0]).toBe(4);
    expect(response[1]).toBe(4);
    expect(response[2]).toBe(3);
  });

  it("case 2", () => {
    const getInputs = () => [
      [{}, {}],
      [{}, {}],
      [{}, {}],
    ];
    let counter = 0;
    function add(a, b) {
      counter++;
      return a + b;
    }

    const memoAdd = memoize(add);

    const params = getInputs();

    const response = params.map((v) => {
      return memoAdd.apply(this, v);
    });

    expect(counter).toBe(3);
    expect(response[0]).toBe(NaN);
    expect(response[1]).toBe(NaN);
    expect(response[2]).toBe(NaN);
  });

  it("case 3", () => {});
});
