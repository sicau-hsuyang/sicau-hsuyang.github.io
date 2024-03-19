function calc(
  candidates: number[],
  plans: number[],
  sum: number,
  target: number
): number[][] {
  // 如果已经没有元素了，还无法组成结果，肯定是不符合的解集
  if (candidates.length === 0 && sum < target) {
    return [];
  }
  // 如果最小的元素加起来都已经比目标值大的话，说明也没有可能的结果了
  else if (candidates[0] + sum > target) {
    return [];
  }
  // 如果集合中只有一个元素
  else if (candidates[0] + sum === target) {
    return [[...plans, candidates[0]]];
  } else {
    const val = candidates[0];
    const nextArr = candidates.slice(1);
    const selectedResults = calc(nextArr, [...plans, val], sum + val, target);
    const unselectedResults = calc(nextArr, plans, sum, target);
    const distResults: number[][] = [];
    const map: Map<number, number[][]> = new Map();
    for (let i = 0; i < selectedResults.length; i++) {
      const temp = selectedResults[i];
      if (!map.get(temp.length)) {
        distResults.push(temp);
        map.set(temp.length, [temp]);
      } else {
        const preRecord = map.get(temp.length) || [];
        const hasSameRecord = preRecord.some((arr) => {
          return arr.every((el, elIdx) => {
            return el === temp[elIdx];
          });
        });
        if (!hasSameRecord) {
          distResults.push(temp);
          preRecord.push(temp);
        }
      }
    }
    for (let i = 0; i < unselectedResults.length; i++) {
      const temp = unselectedResults[i];
      if (!map.get(temp.length)) {
        distResults.push(temp);
        map.set(temp.length, [temp]);
      } else {
        const preRecord = map.get(temp.length) || [];
        const hasSameRecord = preRecord.some((arr) => {
          return arr.every((el, elIdx) => {
            return el === temp[elIdx];
          });
        });
        if (!hasSameRecord) {
          distResults.push(temp);
          preRecord.push(temp);
        }
      }
    }
    return distResults;
  }
}

export function combinationSum2(
  candidates: number[],
  target: number
): number[][] {
  const sum = candidates.reduce((t, i) => {
    return t + i;
  }, 0);
  if (sum < target) {
    return [];
  }
  candidates.sort((a, b) => {
    return a - b;
  });
  candidates = candidates.filter((v) => v <= target);
  const plans = calc(candidates, [], 0, target);
  return plans;
}
