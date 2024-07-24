import { networkDelayTime } from "./networkDelayTime";

describe("networkDelayTime", () => {
  it("case 1", () => {
    const times = [
        [2, 1, 1],
        [2, 3, 1000],
        [3, 4, 1],
      ],
      n = 4,
      k = 2;
    const delay = networkDelayTime(times, n, k);
    console.log(delay);
  });

  it("case 2", () => {
    const times = [
        [1, 2, 1],
        [2, 1, 3],
      ],
      n = 2,
      k = 2;
    const delay = networkDelayTime(times, n, k);
    console.log(delay);
  });

  it("case 3", () => {
    const times = [
        [1, 2, 1],
        [2, 3, 2],
        [1, 3, 2],
      ],
      n = 3,
      k = 1;
    const delay = networkDelayTime(times, n, k);
    console.log(delay);
  });
});
