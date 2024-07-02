import { evalRPN } from "./evalRPN";

describe("evalRPN", () => {
  it("case 1", () => {
    const tokens = [
      "10",
      "6",
      "9",
      "3",
      "+",
      "-11",
      "*",
      "/",
      "*",
      "17",
      "+",
      "5",
      "+",
    ];
    evalRPN(tokens);
  });
});
