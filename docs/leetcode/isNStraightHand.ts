export function isNStraightHand(hand: number[], groupSize: number): boolean {
  const map: Map<number, number> = new Map();
  for (let i = 0; i < hand.length; i++) {
    let num = hand[i];
    let cnt = map.get(num) || 0;
    if (cnt === 0) {
      map.set(num, 1);
    } else {
      map.set(num, cnt + 1);
    }
  }
  const records = [...map.entries()].sort((a, b) => {
    return a[0] - b[0];
  });
  while (records.length !== 0) {
    // 剩下的不够凑成顺子了
    if (records.length < groupSize) {
      return false;
    }
    // 先取出来第一个
    let prevNum = records[0][0];
    records[0][1]--;
    for (let i = 1; i < groupSize; i++) {
      if (prevNum + 1 !== records[i][0] || records[i][1] === 0) {
        return false;
      }
      records[i][1]--;
      prevNum = records[i][0];
    }
    // 扔掉K组
    while (records.length && records[0][1] === 0) {
      records.shift();
    }
  }
  return true;
}

//
