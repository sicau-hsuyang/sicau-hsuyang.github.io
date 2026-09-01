function isPalindrome(s: string) {
  const flag = s.length % 2 === 0;
  let mid = Math.floor(s.length / 2);
  let start = flag ? mid - 1 : mid;
  let end = mid;
  while (start >= 0 && end < s.length) {
    if (s[start] !== s[end]) {
      return false;
    }
    start--;
    end++;
  }
  return true;
}

export function partition(s: string): string[][] {
  if (s === "") {
    return [];
  }
  const res: string[][] = [];
  // 本身就是一个回文串
  if (isPalindrome(s)) {
    res.push([s]);
  }
  for (let i = 0; i < s.length; i++) {
    const cur = s.substring(0, i + 1);
    const next = s.substring(i + 1);
    const nextRes = partition(next);
    if (isPalindrome(cur)) {
      for (let k = 0; k < nextRes.length; k++) {
        res.push([cur, ...nextRes[k]]);
      }
    }
  }
  return res;
}
