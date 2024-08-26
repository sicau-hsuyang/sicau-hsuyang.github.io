function _isPalindrome(
  s: string,
  i: number,
  j: number,
  min: number,
  max: number
) {
  let start = i;
  let end = j;
  let res: { start: number; end: number }[] = [];
  while (start >= min && end <= max) {
    if (s[start] !== s[end]) {
      break;
    }
    if (start !== end) {
      res.push({
        start,
        end,
      });
    }
    start--;
    end++;
  }
  return res;
}

function isPalindrome(s: string, start: number, end: number) {
  if (start === end) {
    return true;
  }
  let len = end - start + 1;
  const mid = Math.floor((start + end) / 2);
  if (len % 2 === 0) {
    return _isPalindrome(s, mid, mid + 1, start, end).length >= 1;
  } else {
    return _isPalindrome(s, mid, mid, start, end).length >= 1;
  }
}

export function minCut(
  s: string,
  map: Map<string, number> = new Map()
): number {
  if (map.has(s)) {
    return map.get(s)!;
  }
  // 自身是回文，不用切
  if (isPalindrome(s, 0, s.length - 1)) {
    map.set(s, 0);
    return 0;
  } else {
    // 假设子串种完全没有构成回文的可能，每个都切一刀
    let minCount = s.length - 1;
    const updateMinCut = (plan: { start: number; end: number }[]) => {
      plan.forEach(({ start, end }) => {
        // 左边的全部已经不是回文了
        let left = Math.max(start, 1);
        // 中间的可能是回文
        const rightStr = s.substring(end + 1);
        // 右边还有可能包含回文
        let right = minCut(rightStr, map);
        const count = left + right;
        if (count < minCount) {
          minCount = count;
        }
      });
    };
    for (let i = 0; i < s.length; i++) {
      const plan1 = _isPalindrome(s, i, i + 1, 0, s.length - 1);
      updateMinCut(plan1);
      const plan2 = _isPalindrome(s, i, i, 0, s.length - 1);
      updateMinCut(plan2);
    }
    map.set(s, minCount);
    return minCount;
  }
}
