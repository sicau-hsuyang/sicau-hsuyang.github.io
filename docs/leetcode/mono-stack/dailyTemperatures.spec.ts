import { dailyTemperatures } from "./dailyTemperatures";

describe("dailyTemperatures", () => {
  it("case 1", () => {
    const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
    const results = dailyTemperatures(temperatures);
    expect(results).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
  });

  it("case 2", () => {
    const temperatures = [73, 74, 75, 71, 69, 72, 76, 71, 73];
    const results = dailyTemperatures(temperatures);
    expect(results).toEqual([1, 1, 4, 2, 1, 1, 0, 1, 0]);
  });

  it("case 3", () => {
    const temperatures = [73, 74, 75, 71, 69, 71, 76, 73, 74, 72, 76, 73];
    const results = dailyTemperatures(temperatures);
    expect(results).toEqual([1, 1, 4, 3, 1, 1, 0, 1, 2, 1, 0, 0]);
  });

  it("case 4", () => {
    const temperatures = [40, 40, 40, 30];
    const results = dailyTemperatures(temperatures);
    expect(results).toEqual([0, 0, 0, 0]);
  });
});
