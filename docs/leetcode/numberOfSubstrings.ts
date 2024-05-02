export function numberOfSubstrings(s: string): number {
  const dict = {
    a: 0,
    b: 0,
    c: 0,
  } as const;
  let total = 0;
  let left = 0;
  let len = s.length;
  for (let right = 0; right < len; right++) {
    // 如果三者有一个是0，说明是不满足条件的，则一直可以向后扩展窗口
    const char = s[right];
    dict[char]++;
    while (dict.a !== 0 && dict.b !== 0 && dict.c !== 0) {
      // for (let k = right + 1; k <= len; k++) {
      //   console.log(s.substring(left, right + 1) + s.substring(right + 1, k));
      // }
      // 如果此刻窗口内已经满足了abc都有的话，那么从这个位置开始，到字符串结尾，每个都是满足要求的解，所以每次计算的次数如下,如果你不放心，
      // 可以用上面的循环打印一下
      total += len - right;
      const leftChar = s[left];
      // 如果仍然满足条件，则可以一直收缩窗口
      left++;
      dict[leftChar]--;
    }
  }
  return total;
}
