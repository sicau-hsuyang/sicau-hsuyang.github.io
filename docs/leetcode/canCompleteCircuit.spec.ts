import { canCompleteCircuit } from "./canCompleteCircuit";

describe("canCompleteCircuit", () => {
  it("case 1", () => {
    const gas = [1, 2, 3, 4, 5],
      cost = [3, 4, 5, 1, 2];
    const num = canCompleteCircuit(gas, cost);
    expect(num).toBe(3);
  });

  it("case 2", () => {
    const gas = [5, 1, 2, 3, 4],
      cost = [4, 4, 1, 5, 1];
    const num = canCompleteCircuit(gas, cost);
    expect(num).toBe(4);
  });
});
