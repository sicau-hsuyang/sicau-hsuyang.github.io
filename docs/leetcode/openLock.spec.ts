import { openLock } from "./openLock";

describe("openLock", () => {
  it("case 1", () => {
    const deadends = ["0201", "0101", "0102", "1212", "2002"],
      target = "0202";
    const distance = openLock(deadends, target);
    console.log(distance);
  });
});
