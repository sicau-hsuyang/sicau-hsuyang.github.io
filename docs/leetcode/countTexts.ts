// const mapping = {
//   "2": "a",
//   "22": "b",
//   "222": "c",
//   "3": "d",
//   "33": "e",
//   "333": "f",
//   "4": "g",
//   "44": "h",
//   "444": "i",
//   "5": "j",
//   "55": "k",
//   "555": "l",
//   "6": "m",
//   "66": "n",
//   "666": "o",
//   "7": "p",
//   "77": "q",
//   "777": "r",
//   "7777": "s",
//   "8": "t",
//   "88": "u",
//   "888": "v",
//   "9": "w",
//   "99": "x",
//   "999": "y",
//   "9999": "z",
// };

// function count(s: string): number {
//   if (s === "") {
//     return 0;
//   }
//   let offset = 0;
//   let total = 0;
//   while (offset < 4 && offset < s.length) {
//     let substr = s.substring(0, offset + 1);
//     if (mapping[substr]) {
//       const subCount = count(s.slice(offset + 1));
//       total += Math.max(subCount, 1);
//     }
//     offset++;
//   }
//   return total;
// }

// function count(s: string, offset: number, memo: number[] = []): number {
//   if (offset >= s.length) {
//     return 0;
//   }
//   if (typeof memo[offset] !== "undefined") {
//     return memo[offset];
//   }
//   let i = 0;
//   let total = 0;
//   while (i < 4 && offset + i < s.length) {
//     let substr = s.substring(offset, offset + i + 1);
//     if (mapping[substr]) {
//       const subCount = count(s, offset + i + 1, memo);
//       total += Math.max(subCount, 1);
//     }
//     i++;
//   }

//   memo[offset] = total % (10 ** 9 + 7);
//   return memo[offset];
// }

// export function countTexts(pressedKeys: string): number {
//   const res = count(pressedKeys, 0);
//   return res;
// }

function count(s: string): number {
  const set = new Set();
  const LIMIT = 10 ** 9 + 7;
  for (let i = 2; i <= 9; i++) {
    for (let j = 1; j <= 3; j++) {
      set.add(String(i).repeat(j));
    }
  }
  set.add("7777");
  set.add("9999");
  const dp: number[] = [];
  dp[s.length] = 0;
  for (let offset = s.length - 1; offset >= 0; offset--) {
    let i = 0;
    let total = 0;
    while (i < 4 && offset + i < s.length) {
      let substr = s.substring(offset, offset + i + 1);
      if (set.has(substr)) {
        const subCount = dp[offset + i + 1];
        total += Math.max(subCount, 1);
      }
      i++;
    }
    dp[offset] = total % LIMIT;
  }

  return dp[0];
}

export function countTexts(pressedKeys: string): number {
  const res = count(pressedKeys);
  return res;
}
