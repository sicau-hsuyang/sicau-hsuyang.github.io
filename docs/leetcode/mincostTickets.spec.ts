import { mincostTickets } from "./mincostTickets";

describe("mincostTickets", () => {
  it("case 1", () => {
    const days = [1, 4, 6, 7, 8, 20],
      costs = [2, 7, 15];
    const val = mincostTickets(days, costs);
    console.log(val);
  });
  it("case 2", () => {
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31],
      costs = [2, 7, 15];
    const val = mincostTickets(days, costs);
    console.log(val);
  });
  it("case 3", () => {
    const days = [
        1, 4, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 27, 28,
      ],
      costs = [3, 13, 45];
    const val = mincostTickets(days, costs);
    console.log(val);
  });
});
