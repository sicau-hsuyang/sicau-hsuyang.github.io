export function longestSemiRepetitiveSubstring(s: string): number {
  let maxDistance = 0;
  let len = s.length;
  let left = 0;
  let adjoinChar = "";
  let adjoinNextPos = -1;
  let lastChar = "";
  for (let right = 0; right < len; right++) {
    const char = s[right];
    // 如果还没有相邻的字符串，当前来的字符串跟最后一个字符串相同，则添加相同的字符串标识
    if (char === lastChar && adjoinChar === "") {
      adjoinChar = lastChar;
      adjoinNextPos = right;
    }
    // 如果已经有相邻的字符串了，当前来的字符串导致了相邻，则舍弃到某个为止
    else if (char === lastChar && adjoinChar !== "") {
      // 还是不包括当前来的这个字符串
      let D = right - left;
      if (D > maxDistance) {
        console.log(s.substring(left, right));
        maxDistance = D;
      }
      adjoinChar = char;
      // 舍弃到相邻字符的第二个字符
      left = adjoinNextPos;
      adjoinNextPos = right;
    }
    // 更新最后一个位置
    lastChar = char;
  }
  // 如果最后还是满足条件的
  let D = len - left;
  if (D > maxDistance) {
    console.log(s.substring(left, len));
    maxDistance = D;
  }
  return maxDistance;
}
