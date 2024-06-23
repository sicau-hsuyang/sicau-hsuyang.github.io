export function nthSuperUglyNumber(n: number, primes: number[]): number {
  let uglyNum = 1;
  let uglyNumRes: number[] = [1];
  // 初始化的时候，都指向1，即第0个丑数
  let pointer: number[] = Array.from({
    length: primes.length,
  }).fill(0) as number[];
  for (let i = 2; i <= n; i++) {
    let min = Number.MAX_VALUE;
    for (let k = 0; k < primes.length; k++) {
      // N个最小的丑数 分别乘以对应的因子，取最小的丑数，作为下一个丑数
      let num = uglyNumRes[pointer[k]] * primes[k];
      if (min > num) {
        min = num;
      }
    }
    // 将新的一个丑数添加到结果集中
    uglyNum = min;
    uglyNumRes.push(uglyNum);
    for (let k = 0; k < primes.length; k++) {
      // 取得对应位置的丑数，将其移动到下一位上去
      if (min === uglyNumRes[pointer[k]] * primes[k]) {
        // 跳到下一个丑数上去
        pointer[k]++;
      }
    }
  }
  // console.log(uglyNum)
  return uglyNum;
}
