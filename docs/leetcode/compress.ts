export function compress(chars: string[]): number {
  let offset = 0;
  let result = "";
  while (offset < chars.length) {
    let k = offset + 1;
    while (chars[k] === chars[offset] && k < chars.length) {
      k++;
    }
    let distance = k - offset;
    if (distance === 1) {
      result += chars[offset];
    } else {
      result += chars[offset] + "" + distance;
    }
    // 跳到新的位置的下一位上去
    offset = k;
  }
  // 将原来数组的长度变成结果的长度
  chars.length = result.length;
  for (let i = 0; i < chars.length; i++) {
    // 逐一拷贝
    chars[i] = result[i];
  }
  return result.length;
}
