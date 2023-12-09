export function longestSubstring(s: string, k: number): number {
  let maxLength = -Infinity;
  for (let i = 0; i < s.length; i++) {
    let k = i;
    // 字符串的多样性
    let len = 0;
    const map: Map<string, number> = new Map();
    while (k < s.length) {
      const char = s[k];
      const times = map.get(char) || 0;
      if (times !== 0) {
        map.set(char, times + 1);
      } else {
        map.set(char, 1);
        // 字符串的多样性增加
        len++;
      }
      const distance = k - i + 1;
      if (distance >= len * k) {
        // 如果每个字符串都出现了大于K次
        let flag = true;
        for (const [char, size] of map.entries()) {
        }
        // 更新最大的k距离
        if (flag && maxLength < distance) {
          maxLength = distance;
        }
      } else {
        k++;
      }
    }
  }
}
