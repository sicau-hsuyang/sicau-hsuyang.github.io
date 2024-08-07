// function findMin(
//   s: string,
//   dictionary: string[],
//   start: number,
//   end: number,
//   memo: number[][]
// ) {
//   const tempStr = s.substring(start, end);
//   if (tempStr === "") {
//     return 0;
//   }
//   if (memo[start][end] !== -1) {
//     return memo[start][end];
//   }
//   let minSize = end - start;
//   for (let i = 0; i < dictionary.length; i++) {
//     let word = dictionary[i];
//     const pos = tempStr.indexOf(word);
//     if (pos < 0) {
//       continue;
//     }
//     const leftSize = findMin(s, dictionary, start, start + pos, memo);
//     const rightSize = findMin(
//       s,
//       dictionary,
//       start + pos + word.length,
//       end,
//       memo
//     );
//     const totalSize = leftSize + rightSize;
//     if (totalSize < minSize) {
//       minSize = totalSize;
//     }
//   }
//   memo[start][end] = minSize;
//   return minSize;
// }

// export function minExtraChar(s: string, dictionary: string[]): number {
//   const memo: number[][] = Array.from({
//     length: s.length + 1,
//   }).map((v) => {
//     return Array.from({
//       length: s.length + 1,
//     }).fill(-1);
//   }) as number[][];
//   return findMin(s, dictionary, 0, s.length, memo);
// }

function findMin(
  s: string,
  dictionary: string[],
  start: number,
  end: number,
  memo: number[][]
) {
  const tempStr = s.substring(start, end);
  if (tempStr === "") {
    return 0;
  }
  if (memo[start][end] !== -1) {
    return memo[start][end];
  }
  let minSize = end - start;
  for (let i = 0; i < dictionary.length; i++) {
    let word = dictionary[i];
    const pos = tempStr.indexOf(word);
    if (pos < 0) {
      continue;
    }
    const leftSize = findMin(s, dictionary, start, start + pos, memo);
    const rightSize = findMin(
      s,
      dictionary,
      start + pos + word.length,
      end,
      memo
    );
    const totalSize = leftSize + rightSize;
    if (totalSize < minSize) {
      minSize = totalSize;
    }
  }
  memo[start][end] = minSize;
  return minSize;
}

export function minExtraChar(s: string, dictionary: string[]): number {
  const dp: number[][] = Array.from({
    length: s.length + 1,
  }).map((v) => {
    return Array.from({
      length: s.length + 1,
    }).fill(0);
  }) as number[][];
  dp[0][s.length] = s.length;
  for (let start = 0; start <= s.length; start++) {
    for (let end = start + 1; end <= s.length; end++) {
      const tempStr = s.substring(start, end);
      let minSize = end - start;
      for (let i = 0; i < dictionary.length; i++) {
        let word = dictionary[i];
        const pos = tempStr.indexOf(word);
        if (pos < 0) {
          continue;
        }
        const leftSize = dp[start][start + pos];
        const rightSize = dp[start + pos + word.length][end];
        const totalSize = leftSize + rightSize;
        if (totalSize < minSize) {
          minSize = totalSize;
        }
      }
      dp[start][end] = minSize;
    }
  }
  return dp[0][s.length];
}
