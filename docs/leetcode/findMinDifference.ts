interface Struct {
  /**
   * 时间字符串
   */
  time: string;
  /**
   * 总分钟数
   */
  total: number;
}

function calc(timeStr: string) {
  const tmp = timeStr.split(":");
  const hours = Number.parseInt(tmp[0]) * 60;
  const minutes = Number.parseInt(tmp[1]);
  return hours + minutes;
}

export function findMinDifference(timePoints: string[]): number {
  const bucket: Struct[] = [];
  // 最小距离
  let minDistance = Infinity;
  // 把这些时间全部放进桶里面去
  for (let i = 0; i < timePoints.length; i++) {
    const count = calc(timePoints[i]);
    // 有两个相同的时间
    if (bucket[count]) {
      return 0;
    } else {
      bucket[count] = {
        time: timePoints[i],
        total: count,
      };
    }
  }
  let offset = 0;
  // 第一个有值的位置
  let startPos: number;
  let flagTime!: Struct;
  while (!bucket[offset]) {
    offset++;
  }
  // 主要是用来算最后的一个距离
  startPos = offset;
  let prePos = offset;
  flagTime = bucket[offset];
  for (let i = offset + 1; i < bucket.length; i++) {
    if (!bucket[i]) {
      continue;
    } else {
      // 牵涉到取余
      let distance = i - prePos;
      // 取反面
      if (distance > 770) {
        distance = 1440 - distance;
      }
      if (distance < minDistance) {
        minDistance = distance;
      }
      prePos = i;
    }
  }
  // 最后一扳手
  let distance = startPos - prePos + 1440;
  if (distance < minDistance) {
    minDistance = distance;
  }
  return minDistance;
}
