// export function numDecodings(s: string): string[][] {
//   // 到底了
//   if (s === "") {
//     return [];
//   }
//   // 不合法的拆分方式
//   if (s[0] === "0") {
//     return [];
//   }
//   const dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
//   dict.unshift("");
//   if (s.length === 1) {
//     return [[dict[s]]];
//   } else if (s.length === 2) {
//     const plan1 = dict[s[0]];
//     const plan2 = dict[s[1]];
//     const plan3 = dict[s.substring(0, 2)];
//     const results: string[][] = [];
//     if (plan1 && plan2) {
//       results.push([plan1, plan2]);
//     }
//     if (plan3) {
//       results.push([plan3]);
//     }
//     return results;
//   } else {
//     if (s[0] === "1" || s[0] === "2") {
//       let char1 = dict[s[0]];
//       let char2 = dict[s.substring(0, 2)];
//       const results1 = numDecodings(s.substring(1));
//       const results2 = numDecodings(s.substring(2));
//       const res1 = results1.length
//         ? results1.map((v) => {
//             return [char1, ...v];
//           })
//         : [];
//       const res2 =
//         char2 && results2.length
//           ? results2.map((v) => {
//               return [char2, ...v];
//             })
//           : [];
//       return [...res1, ...res2];
//     } else {
//       const results = numDecodings(s.substring(1));
//       const char = dict[s[0]];
//       return results.length
//         ? results.map((v) => {
//             return [char, ...v];
//           })
//         : [];
//     }
//   }
// }

const dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
dict.unshift("");

// export function numDecodings(s: string, dp: number[] = [], offset = 0): number {
//   // 到底了
//   if (s.length === offset || s[offset] === "0") {
//     return 0;
//   }
//   if (dp[offset]) {
//     return dp[offset];
//   }
//   if (s.length === 1 + offset) {
//     return 1;
//   } else if (s.length === 2 + offset) {
//     let total = 0;
//     if (dict[s[offset]] && dict[s[offset + 1]]) {
//       total++;
//     }
//     const str = s.substring(offset);
//     if (dict[str]) {
//       total++;
//     }
//     return total;
//   } else {
//     let results1 = numDecodings(s, dp, offset + 1);
//     dp[offset + 1] = results1;
//     const str = s.substring(offset, offset + 2);
//     if (dict[str]) {
//       const results2 = numDecodings(s, dp, offset + 2);
//       dp[offset + 2] = results2;
//       results1 += results2;
//     }
//     return results1;
//   }
// }

export function numDecodings(s: string): number {
  let n = s.length;
  let dp: number[] = Array.from({
    length: s.length,
  }).fill(0) as number[];
  // 初始化最后的一个
  if (s[n - 1] !== "0") {
    dp[n - 1] = 1;
  }
  let total = 0;
  if (dict[s[n - 2]] && dict[s[n - 1]]) {
    total++;
  }
  const str = s.substring(n - 2, n);
  if (dict[str]) {
    total++;
  }
  dp[n - 2] = total;
  for (let k = n - 3; k >= 0; k--) {
    if (s[k] === "0") {
      dp[k] = 0;
    } else {
      let count = dp[k + 1];
      const str = s.substring(k, k + 2);
      if (dict[str]) {
        count += dp[k + 2];
      }
      dp[k] = count;
    }
  }
  return dp[0];
}
