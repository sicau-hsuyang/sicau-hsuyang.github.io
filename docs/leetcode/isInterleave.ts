// export function isInterleave(s1: string, s2: string, s3: string) {
//   if (s1.length + s2.length !== s3.length) {
//     return false;
//   }
//   const dp: number[][][] = Array.from({
//     length: s1.length + 1,
//   }).map((v) => {
//     return Array.from({
//       length: s2.length + 1,
//     }).map((x) => {
//       return Array.from({
//         length: s3.length + 1,
//       }).fill(-1);
//     }) as number[][];
//   }) as number[][][];
//   const res = _isInterleave(s1, s2, s3, dp);
//   return res === 1;
// }

// function _isInterleave(
//   s1: string,
//   s2: string,
//   s3: string,
//   dp: number[][][],
//   offset1: number = 0,
//   offset2: number = 0,
//   offset3: number = 0
// ) {
//   if (offset3 >= s3.length) {
//     return 1;
//   }
//   if (dp[offset1][offset2][offset3] !== -1) {
//     return dp[offset1][offset2][offset3];
//   }
//   let res: number;
//   if (s1[offset1] === s3[offset3] && s2[offset2] === s3[offset3]) {
//     res =
//       _isInterleave(s1, s2, s3, dp, offset1 + 1, offset2, offset3 + 1) ||
//       _isInterleave(s1, s2, s3, dp, offset1, offset2 + 1, offset3 + 1);
//   } else if (s1[offset1] === s3[offset3]) {
//     res = _isInterleave(s1, s2, s3, dp, offset1 + 1, offset2, offset3 + 1);
//   } else if (s2[offset2] === s3[offset3]) {
//     res = _isInterleave(s1, s2, s3, dp, offset1, offset2 + 1, offset3 + 1);
//   } else {
//     res = 0;
//   }
//   dp[offset1][offset2][offset3] = res;
//   return res;
// }
