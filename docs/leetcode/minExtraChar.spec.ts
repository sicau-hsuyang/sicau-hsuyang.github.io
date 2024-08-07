import { minExtraChar } from "./minExtraChar";

describe("minExtraChar", () => {
  it("case 1", () => {
    const s = "leetscode",
      dictionary = ["leet", "code", "leetcode"];
    const l = minExtraChar(s, dictionary);
    console.log(l);
  });

  it("case 2", () => {
    const s = "eglglxa",
      dictionary = [
        "rs",
        "j",
        "h",
        "g",
        "fy",
        "l",
        "fc",
        "s",
        "zf",
        "i",
        "k",
        "x",
        "gl",
        "qr",
        "qj",
        "b",
        "m",
        "cm",
        "pe",
        "y",
        "ei",
        "wg",
        "e",
        "c",
        "ll",
        "u",
        "lb",
        "kc",
        "r",
        "gs",
        "p",
        "ga",
        "pq",
        "o",
        "wq",
        "mp",
        "ms",
        "vp",
        "kg",
        "cu",
      ];
    const l = minExtraChar(s, dictionary);
    console.log(l);
  });

  it("case 3", () => {
    const s = "eglglxaeglglxaeglglxaeglglxaeglglxaeglglxaeglglxa",
      dictionary = [
        "rs",
        "j",
        "h",
        "g",
        "fy",
        "l",
        "fc",
        "s",
        "zf",
        "i",
        "k",
        "x",
        "gl",
        "qr",
        "qj",
        "b",
        "m",
        "cm",
        "pe",
        "y",
        "ei",
        "wg",
        "e",
        "c",
        "ll",
        "u",
        "lb",
        "kc",
        "r",
        "gs",
        "p",
        "ga",
        "pq",
        "o",
        "wq",
        "mp",
        "ms",
        "vp",
        "kg",
        "cu",
      ];
    const l = minExtraChar(s, dictionary);
    console.log(l);
  });
});
