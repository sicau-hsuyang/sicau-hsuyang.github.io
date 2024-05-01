export function characterReplacement(s: string, k: number): number {
  const set = new Set(s);
  const dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let maxDistance = 0;
  for (let i = 0; i < dict.length; i++) {
    let left = 0;
    // 选择当前这个字符作为替换的依据，其它字符过来全都要替换成这个
    let selectChar = dict[i];
    // 如果当前字符串里面没有这个字符，后续都不需要再做了
    if (!set.has(selectChar)) {
      continue;
    }
    // 如果已经找到了最好的结果
    if (maxDistance === s.length) {
      return maxDistance;
    }
    // 窗口内的操作次数
    let windowK = k;
    for (let right = 0; right < s.length; right++) {
      let char = s[right];
      // 如果当前字符就是我们当前设想的字符
      if (char !== selectChar) {
        // 执行替换操作
        windowK--;
        // 如果替换的次数已经用完了，向后滑动
        while (windowK < 0) {
          if (s[left] !== selectChar) {
            windowK++;
          }
          left++;
        }
        // console.log(s.substring(left, right + 1));
      }
      // 更新最大距离
      let D = right - left + 1;
      if (D > maxDistance) {
        // console.log(s.substring(left, right + 1));
        maxDistance = D;
      }
    }
  }
  return maxDistance;
}
