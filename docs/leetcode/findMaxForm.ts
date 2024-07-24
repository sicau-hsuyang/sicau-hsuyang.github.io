function find(strs: string[], m: number, n: number): number {
  const dp: number[][][] = Array.from({
    length: strs.length,
  }).map(() => {
    return Array.from({
      length: m + 1,
    }).map(() => {
      return Array.from({
        length: n + 1,
      }).fill(0) as number[];
    });
  });
  for (let k = 0; k < strs.length; k++) {
    const str = strs[k];
    let mCount = 0;
    let nCount = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === "0") {
        mCount++;
      } else {
        nCount++;
      }
    }
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        dp[k][i][j] = dp[k - 1]?.[i][j] || 0;
        if (i >= mCount && j >= nCount) {
          dp[k][i][j] = Math.max(
            (dp[k - 1]?.[i - mCount][j - nCount] || 0) + 1,
            dp[k][i][j]
          );
        }
      }
    }
  }
  return dp[strs.length - 1][m][n];
}

export function findMaxForm(strs: string[], m: number, n: number): number {
  const count = find(strs, m, n);
  return count;
}

// function find(strs: string[], m: number, n: number): number {
//   // 无法再继续选择了
//   if (m < 0 || n < 0) {
//     return 0;
//   }
//   const length = strs.length;
//   const dp: number[][][] = new Array(length + 1)
//     .fill(0)
//     .map(() => new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0)));
//   for (let i = 1; i <= length; i++) {
//     const str = strs[i - 1];
//     let mCount = 0;
//     let nCount = 0;
//     for (let o = 0; o < str.length; o++) {
//       const char = str[o];
//       if (char === "0") {
//         mCount++;
//       } else {
//         nCount++;
//       }
//     }
//     for (let j = 0; j <= m; j++) {
//       for (let k = 0; k <= n; k++) {
//         dp[i][j][k] = dp[i - 1][j][k];
//         if (j >= mCount && k >= nCount) {
//           dp[i][j][k] = Math.max(
//             dp[i][j][k],
//             dp[i - 1][j - mCount][k - nCount] + 1
//           );
//         }
//       }
//     }
//   }

//   return dp[length][m][n];
// }

// export function findMaxForm(strs: string[], m: number, n: number): number {
//   const count = find(strs, m, n);
//   return count;
// }
