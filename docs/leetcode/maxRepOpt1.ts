export function maxRepOpt1(text: string): number {
  const map: Map<string, number> = new Map();
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const counter = map.get(char) || 0;
    if (counter === 0) {
      map.set(char, 1);
    } else {
      map.set(char, counter + 1);
    }
  }
  let maxDistance = 0;
  let left = 0;
  let char1: string = "",
    char2: string = "";
  let char1Counter: number = 0,
    char2Counter: number = 0;
  let char1Pos: number = 0,
    char2Pos: number = 0;
  for (let right = 0; right < text.length; right++) {
    const char = text[right];
    // 窗口里面没有一个字符
    if (!char1) {
      char1 = char;
      char1Pos = right;
      char1Counter++;
    }
    // 窗口里面已经存在一个字符，又来一个新的字符
    else if (char1 && !char2 && char != char1) {
      char2 = char;
      char2Pos = right;
      char2Counter++;
    }
    // 窗口里面已经存在两个字符串
    else if (char1 && char2) {
      // 跟第一个字符相同，添加到第一个里面去
      if (char === char1) {
        char1Counter++;
        char1Pos = right;
      }
      // 跟第二个字符相同，添加到第二个里面去
      else if (char === char2) {
        char2Counter++;
        char2Pos = right;
      }
      // 都不相同
      else {
        let D = right - left + 1;
        const targetChar = char1Counter === 1 ? char2 : char1;
        const targetCharSize = map.get(targetChar) || 0;
        if (D > maxDistance && targetCharSize >= D) {
          maxDistance = D;
        }
        // 一个为1，一个不为1
        if (!(char1Counter == 1 && char2Counter === 1)) {
          // 取出一个pos
          const pos = char1Counter === 1 ? char1Pos : char2Pos;
          left = pos;
        }
        // 同时为1
        else {
          // 窗口收缩到较后面的那个位置上
          left = Math.max(char1Pos, char2Pos);
        }
      }
    }
  }
  return maxDistance;
}

/**
使用哈希表记录每个字符出现的次数

在窗口内最多只能放一个其它元素，其余都是一样的，如果说哈希表中还剩一个以上的话，说明可以构成

 */
