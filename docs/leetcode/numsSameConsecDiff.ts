export function numsSameConsecDiff(n: number, k: number): number[] {
  const res: number[] = [];
  for (let D = 1; D <= 9; D++) {
    const queue: number[] = [D];
    while (queue.length) {
      const num = queue.shift()!;
      const str = String(num);
      if (str.length === n) {
        res.push(num);
      } else if (str.length < n) {
        // 得到最后一个数字
        const lastNum = num % 10;
        // 如果需要偏移量
        if (k !== 0) {
          const rightDistance = k + lastNum;
          // 向右算大的值
          if (rightDistance < 10) {
            queue.push(num * 10 + rightDistance);
          }
          const leftDistance = lastNum - k;
          if (leftDistance >= 0) {
            queue.push(num * 10 + leftDistance);
          }
        } else {
          // 否则直接处理最后一位数字
          queue.push(num * 10 + lastNum);
        }
      }
    }
  }
  return res;
}
