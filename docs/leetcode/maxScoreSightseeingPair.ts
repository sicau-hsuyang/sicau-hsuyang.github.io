// /**
//  *
//  * @param values
//  * @param selectedIdx
//  * @param offset
//  */
// function selection(
//   values: number[],
//   selectedIdx: number,
//   offset: number,
//   memo: number[][]
// ) {
//   if (offset >= values.length) {
//     return 0;
//   }
//   if (memo[offset][selectedIdx]) {
//     return memo[offset][selectedIdx];
//   }
//   // 如果已经选过了
//   if (selectedIdx !== -1) {
//     // 之前选过了一个，现在再选一个
//     const plan1 = values[selectedIdx] + values[offset] - (offset - selectedIdx);
//     // 之前选过了一个，现在不选这个
//     const plan2 = selection(values, selectedIdx, offset + 1, memo);
//     const score = Math.max(plan1, plan2);
//     memo[offset][selectedIdx] = score;
//     return score;
//   } else {
//     // 继续不选
//     const plan1 = selection(values, -1, offset + 1, memo);
//     // 选当前的
//     const plan2 = selection(values, offset, offset + 1, memo);
//     const score = Math.max(plan1, plan2);
//     memo[offset][selectedIdx] = score;
//     return score;
//   }
// }

// export function maxScoreSightseeingPair(values: number[]): number {
//   const memo: number[][] = Array.from({
//     length: values.length,
//   }).map((v) => {
//     return Array.from({
//       length: values.length,
//     }).fill(0) as number[];
//   }) as number[][];
//   return selection(values, -1, 0, memo);
// }

/**
 *
 * @param values
 * @param selectedIdx
 * @param offset
 */
function selection(
  values: number[],
  selectedIdx: number,
  offset: number,
  memo: number[][]
) {
  if (offset >= values.length) {
    return 0;
  }
  if (memo[offset][selectedIdx]) {
    return memo[offset][selectedIdx];
  }
  // 如果已经选过了
  if (selectedIdx !== -1) {
    // 之前选过了一个，现在再选一个
    const plan1 = values[selectedIdx] + values[offset] - (offset - selectedIdx);
    // 之前选过了一个，现在不选这个
    const plan2 = selection(values, selectedIdx, offset + 1, memo);
    const score = Math.max(plan1, plan2);
    memo[offset][selectedIdx] = score;
    return score;
  } else {
    // 继续不选
    const plan1 = selection(values, -1, offset + 1, memo);
    // 选当前的
    const plan2 = selection(values, offset, offset + 1, memo);
    const score = Math.max(plan1, plan2);
    memo[offset][selectedIdx] = score;
    return score;
  }
}

export function maxScoreSightseeingPair(values: number[]): number {
  const dp: number[][] = Array.from({
    length: values.length,
  }).map((v) => {
    return Array.from({
      length: values.length,
    }).fill(0) as number[];
  }) as number[][];
  
  for(let i = 0;i<values.length;i++) {

  }
}
