import { calcEquation } from "./calcEquation";

describe("calcEquation", () => {
  it("case 1", () => {
    const equations = [
        ["a", "b"],
        ["b", "c"],
      ],
      values = [2.0, 3.0],
      queries = [
        ["a", "c"],
        ["b", "a"],
        ["a", "e"],
        ["a", "a"],
        ["x", "x"],
      ];
    const results = calcEquation(equations, values, queries);
  });

  it("case 2", () => {
    const equations = [
        ["a", "b"],
        ["b", "c"],
        ["bc", "cd"],
      ],
      values = [1.5, 2.5, 5.0],
      queries = [
        ["a", "c"],
        ["c", "b"],
        ["bc", "cd"],
        ["cd", "bc"],
      ];
    const results = calcEquation(equations, values, queries);
    console.log(results);
  });

  it("case 3", () => {
    const equations = [["a", "b"]],
      values = [0.5],
      queries = [
        ["a", "b"],
        ["b", "a"],
        ["a", "c"],
        ["x", "y"],
      ];
    const results = calcEquation(equations, values, queries);
    console.log(results);
  });

  it("case 4", () => {
    const equations = [
        ["a", "e"],
        ["b", "e"],
      ],
      values = [4.0, 3.0],
      queries = [
        ["a", "b"],
        ["e", "e"],
        ["x", "x"],
      ];
    const results = calcEquation(equations, values, queries);
    console.log(results);
  });

  it("case 5", () => {
    const equations = [
        ["a", "e"],
        ["e", "c"],
        ["e", "f"],
        ["f", "g"],
      ],
      values = [4.0, 3.0, 6.0, 0.3, 10],
      queries = [["a", "g"]];
    const results = calcEquation(equations, values, queries);
    console.log(results);
  });
});
