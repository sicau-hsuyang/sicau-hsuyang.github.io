export function maximumLength(s: string): number {
  const l = s.length;
  let maxLength = 0;
  // 定义字典
  const dict = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < dict.length; i++) {
    const char = dict[i];
    let len = 1;
    let count = 0;
    for (; len < l - 3; len++) {
      const pattern = char.repeat(len);
      let offset = 0;
      // 找到一个跟pattern相同的位置
      while (s[offset] !== pattern[0] && offset < l) {
        offset++;
      }
      // 如果一个都找不到的话，可以看下一个字符了
      if (offset === l) {
        break;
      }
      let left = 0;
      // 从指定的位置开始匹配，如果找到了的话
      for (let k = offset; k < l && left < pattern.length; k++) {
        if (s[k] === pattern[left]) {
          left++;
        }
      }
    }
    if (len > maxLength && count >= 3) {
      maxLength = len;
    }
  }

  return maxLength;
}
