import { findMinDifference } from "./findMinDifference";

describe("findMinDifference", () => {
  it("case 1", () => {
    // const timePoints = ["23:59", "09:00", "19:00", "00:00"];
    // const timePoints = ["09:00", "12:00", "19:00", "00:00"];
    const timePoints = ["19:00", "18:00", "00:00"];
    const res = findMinDifference(timePoints);
    console.log(res);
  });
});
