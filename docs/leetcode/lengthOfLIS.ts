export function lengthOfLIS(nums: number[]): number {
  let MAX = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let cur = nums[i];
    const seqs = [[cur]];
    for (let k = i + 1; k < nums.length; k++) {
      const num = nums[k];
      // 如果当前值比开始的值大，最大长度+1
      if (num <= cur) {
        continue;
      }
      // 如果当前来的值要比起始值大，这样才有操作的意义
      for (let d = 0; d < seqs.length; d++) {
        const seq = seqs[d];
        if (num > seq[seq.length - 1]) {
          seq.push(num);
        } else {
          // 重新生成新的子序列
          seqs.push([cur, num]);
        }
      }
    }
    let max = -Infinity;
    for (let k = 0; k < seqs.length; k++) {
      const len = seqs[k].length;
      if (len > max) {
        max = len;
      }
    }
    if (max > MAX) {
      MAX = max;
    }
  }
  return MAX;
}
