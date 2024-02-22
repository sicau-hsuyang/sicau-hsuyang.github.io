export function countBinarySubstrings(s: string): number {
  let total = 0;
  // 0或者1的个数
  let size = 0;
  // 标记第一次遇到的是0还是1
  let flag = "-1";
  for (let i = 0; i < s.length; ) {
    let offset = i;
    let distance;
    while (offset < s.length) {
      const char = s[offset];
      // 初始化的场景下，让其等于第一次遇到的0或1的值
      if (flag === "-1") {
        flag = char;
      }
      // 连续的字符增加
      if (flag !== "-1" && char === flag) {
        size++;
        offset++;
      }
      // 如果遇到了不是跟标记字符串一样的内容
      else if (flag !== "-1" && char !== flag) {
        // const preStr = s.substring(offset - size, offset);
        // 取这么长，每个进行比较，每个都不是跟其相同
        const str = s.substring(offset, size + offset);
        let move = size;
        const equal = str.length === size;
        while (equal && size && str[size - 1] != flag) {
          move--;
          size--;
        }
        if (size === 0) {
          total++;
          // console.log(preStr + str);
        }
        // 初始化标记，结束右指针的移动
        size = 0;
        flag = "-1";
        // 跨过无用的距离
        distance = move - 1;
        break;
      }
    }
    i += distance <= 0 ? 1 : distance;
  }
  return total;
}
