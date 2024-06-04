import { watchedVideosByFriends } from "./watchedVideosByFriends";

describe("watchedVideosByFriends", () => {
  it("case 2", () => {
    const watchedVideos = [["A", "B"], ["C"], ["B", "C"], ["D"]],
      friends = [
        [1, 2],
        [0, 3],
        [0, 3],
        [1, 2],
      ],
      id = 0,
      level = 1;
    const values = watchedVideosByFriends(watchedVideos, friends, id, level);
    expect(values).toEqual(["B", "C"]);
  });

  it("case 3", () => {
    const watchedVideos = [["A", "B"], ["C"], ["B", "C"], ["D"]],
      friends = [
        [1, 2],
        [0, 3],
        [0, 3],
        [1, 2],
      ],
      id = 0,
      level = 2;
    const values = watchedVideosByFriends(watchedVideos, friends, id, level);
    expect(values).toEqual(["D"]);
  });

  it("case 4", () => {
    const watchedVideos = [["A", "B"]],
      friends = [],
      id = 0,
      level = 0;
    const values = watchedVideosByFriends(watchedVideos, friends, id, level);
    expect(values).toEqual(["A", "B"]);
  });

  it("case 5", () => {
    const watchedVideos = [
        ["ywt", "m", "ldgs", "sgpdvmj"],
        ["k", "jafgkzs", "kng", "vdmrl"],
        ["yrhcxbce", "frg", "yk", "yktqi", "kkdjht", "esrydkbn"],
      ],
      friends = [[], [2], [1]],
      id = 1,
      level = 1;
    const values = watchedVideosByFriends(watchedVideos, friends, id, level);
    console.log(values);
    // expect(values).toEqual(["A", "B"]);
  });

  it("case 6", () => {
    const watchedVideos = [
        ["scil", "srdoi", "zb", "atvac", "dzbghzs"],
        ["of", "fxdn"],
        ["riwpk", "gu", "baazjx", "omkmcc", "todigz"],
        ["vlifrgjg", "lcic", "cusukhmj", "k", "kzs"],
        ["drtszt", "hh"],
      ],
      friends = [[2], [3, 2], [0, 4, 3, 1], [1, 2], [2]],
      id = 0,
      level = 2;
    const values = watchedVideosByFriends(watchedVideos, friends, id, level);
    console.log(values);
    // expect(values).toEqual(["A", "B"]);
  });
});
