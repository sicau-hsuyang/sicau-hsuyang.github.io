export function maximumLengthSubstring(s: string): number {
  const map: Map<string, number[]> = new Map();
  let left = 0;
  let maxDistance = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    const arr = map.get(char) || [];
    if (arr.length === 0) {
      map.set(char, arr);
    }
    // 如果还没有超过2个字符，直接加上
    if (arr.length <= 1) {
      arr.push(right);
    } else if (arr.length === 2) {
      const D = right - left;
      console.log(s.substring(left, right));
      if (maxDistance < D) {
        // console.log(s.substring(left, right));
        maxDistance = D;
      }
      // 将left指针指向下一个第二个字符的位置，使得窗口里面最多只有一个字符重复了两次
      // 已经超过2个字符了，丢弃掉第一个字符的位置
      // 注意，不能走回头路，因为回头路可能有坑
      left = Math.max(left, arr[0] + 1);
      arr.shift();
      arr.push(right);
    }
  }
  let len = s.length;
  const D = len - left;
  if (maxDistance < D) {
    console.log(s.substring(left, len));
    maxDistance = D;
  }
  return maxDistance;
}
