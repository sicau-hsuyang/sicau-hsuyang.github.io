function match(
  s: string,
  offsetS: number,
  p: string,
  offsetP: number,
  cache: number[][]
): boolean {
  // 命中缓存
  if (cache[offsetS][offsetP]) {
    console.log("命中缓存");
    return true;
  }
  // 比较到结尾了
  if (offsetS >= s.length && offsetP >= p.length) {
    return true;
  }
  // 模式串用完了，但是需要待匹配的字符串还没有用完
  else if (offsetP >= p.length) {
    return false;
  }
  // 待匹配字符串用完了
  else if (offsetS >= s.length) {
    // 后面必须是 .*
    for (let k = offsetP; k < p.length; k += 2) {
      if (p[k + 1] !== "*") {
        return false;
      }
    }
    cache[offsetS][offsetP] = 1;
    return true;
  } else {
    // 单个相等
    if (p[offsetP + 1] !== "*") {
      // 完全相等
      if (s[offsetS] === p[offsetP] || p[offsetP] === ".") {
        const res = match(s, offsetS + 1, p, offsetP + 1, cache);
        cache[offsetS][offsetP] = res ? 1 : 0;
        return res;
      }
      // 确实不相等
      else {
        return false;
      }
    }
    // 匹配{0, N}
    else {
      // [a-z]*
      if (p[offsetP] !== ".") {
        let k = offsetS;
        while (s[k] === p[offsetP]) {
          let canMatch = match(s, k, p, offsetP + 2, cache);
          if (canMatch) {
            cache[offsetS][offsetP] = 1;
            return true;
          }
          k++;
        }
        if (match(s, k, p, offsetP + 2, cache)) {
          cache[offsetS][offsetP] = 1;
          return true;
        }
        return false;
      } else {
        // .*
        let k = offsetS;
        while (k <= s.length) {
          let canMatch = match(s, k, p, offsetP + 2, cache);
          if (canMatch) {
            cache[offsetS][offsetP] = 1;
            return true;
          }
          k++;
        }
        return false;
      }
    }
  }
}

export function isMatch(s: string, p: string): boolean {
  const cache = Array.from({
    length: s.length + 1,
  }).map((v) => {
    return Array.from({
      length: p.length + 1,
    }).fill(0);
  }) as number[][];
  return match(s, 0, p, 0, cache);
}
