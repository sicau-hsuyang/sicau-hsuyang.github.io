export function nthUglyNumber(n: number): number {
  let uglyNum = 1;
  let uglyNumRes: number[] = [1];
  // 初始化的时候，都指向1，即第0个丑数
  let pointer: number[] = [0, 0, 0];
  for (let i = 2; i <= n; i++) {
    // 三个最小的丑数 分别乘以 2 3 5，取最小的丑数，作为下一个丑数
    let num1 = uglyNumRes[pointer[0]] * 2;
    let num2 = uglyNumRes[pointer[1]] * 3;
    let num3 = uglyNumRes[pointer[2]] * 5;
    let min = Math.min(num1, num2, num3);
    // 将新的一个丑数添加到结果集中
    uglyNum = min;
    uglyNumRes.push(uglyNum);
    // 这儿，之所以要写成3个单独的if是因为如果有两个同时满足的话，都需要向后移动，并不是只是一个分支的移动
    if (min === num1) {
      // 跳到下一个丑数上去
      pointer[0]++;
    }
    if (min === num2) {
      // 跳到下一个丑数上去
      pointer[1]++;
    }
    if (min === num3) {
      // 跳到下一个丑数上去
      pointer[2]++;
    }
  }
  // console.log(uglyNum)
  return uglyNum;
}

/**
 * 1 1 1 -> 2 3 5 得到 2 1 1
 * 2 1 1 -> 4 3 5 得到 2 3 1
 * 2 3 1 -> 4
 *
 */
