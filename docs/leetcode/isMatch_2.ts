function match(
  s: string,
  offsetS: number,
  p: string,
  offsetP: number,
  cache: boolean[][]
) {
  if (typeof cache[offsetS][offsetP] !== "undefined") {
    // console.log("命中缓存");
    return cache[offsetS][offsetP];
  }
  // 匹配到结束
  if (offsetS >= s.length && offsetP >= p.length) {
    cache[offsetS][offsetP] = true;
    return true;
  }
  // 模板已经使用完，但是待匹配字符串还有
  else if (offsetP >= p.length) {
    cache[offsetS][offsetP] = false;
    return false;
  }
  // 待匹配字符串已经用完，模板还没有使用完
  else if (offsetS >= s.length) {
    let k = offsetP;
    while (p[k] === "*") {
      k++;
    }
    const res = k === p.length;
    cache[offsetS][offsetP] = res;
    return res;
  }
  // 都没有用完
  else {
    // 不是通配符
    if (p[offsetP] !== "*") {
      // 能匹配
      const res =
        s[offsetS] === p[offsetP] || p[offsetP] === "?"
          ? match(s, offsetS + 1, p, offsetP + 1, cache)
          : false;
      cache[offsetS][offsetP] = res;
      return res;
    } else {
      let k = offsetS;
      let res = false;
      while (k <= s.length) {
        const canMatch = match(s, k, p, offsetP + 1, cache);
        if (canMatch) {
          res = true;
          break;
        }
        k++;
      }
      cache[offsetS][offsetP] = res;
      return res;
    }
  }
}

export function isMatch(s: string, p: string): boolean {
  const cache = Array.from({
    length: s.length + 1,
  }).map((v) => {
    return Array.from({
      length: p.length + 1,
    });
  }) as boolean[][];
  return match(s, 0, p, 0, cache);
}

Array.from({
  length: 2000,
})
  .map((v) => {
    return "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  })
  .join("");

Array.from({
  length: 2000,
})
  .map((v) => {
    return "abcdefghijklmnopqrstuvwxyz*?"[Math.floor(Math.random() * 2)];
  })
  .join("");
