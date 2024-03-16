export function combinationSum(
  candidates: number[],
  target: number
): number[][] {
  // 先对其进行排序
  candidates.sort((a, b) => {
    return a - b;
  });
  // 如果超出了最大或者最小的话，肯定是无法找到结果集的
  if (target < candidates[0]) {
    return [];
  }
  // 结果集
  const results: number[][] = [];
  // 用来记录数组，如果数组的长度是一样的，并且数组的和是一样的，则视为重复结果，不处理???
  // [2,2,2], [1,2,3] 明显这个说法是站不住脚的
  const lenRecord: number[][][] = [];
  for (let i = 0; i < candidates.length; i++) {
    const num = candidates[i];
    const val = target - num;
    // 如果剩下的是0了，num可以算作能够组成因子之一
    if (val === 0) {
      results.push([num]);
    } else {
      // 一轮的结果
      const tmpCombineResults = combinationSum(candidates, val);
      tmpCombineResults.forEach((arr) => {
        const tmpSum = arr.reduce((total, item) => {
          return total + item;
        }, num);
        // && lenRecord[arr.length] !== 1
        if (tmpSum === target) {
          const records = [num, ...arr];
          records.sort((a, b) => {
            return b - a;
          });
          // results.push(records);
          // 如果还没有记录任何结果ƒ
          if (!Array.isArray(lenRecord[records.length])) {
            results.push(records);
            lenRecord[records.length] = [records];
          } else {
            const oldRecord = lenRecord[records.length];
            const isRepeat = oldRecord.some((oldArr) => {
              // 当前数组不相同
              const isEqual = oldArr.every((oldEl, oldIdx) => {
                return oldEl === records[oldIdx];
              });
              return isEqual;
            });
            if (!isRepeat) {
              results.push(records);
              lenRecord[records.length].push(records);
            }
          }
        }
      });
    }
  }
  // results.sort((a, b) => {
  //   return a.length - b.length;
  // });
  return results;
}
