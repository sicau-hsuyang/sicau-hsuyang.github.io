export function compareVersion(version1: string, version2: string): number {
  const version1Group: string[] = version1
    .split(".")
    .map((subVersion) => removeZeroPrefix(subVersion));
  const version2Group = version2
    .split(".")
    .map((subVersion) => removeZeroPrefix(subVersion));
  // 取出较大的length来循环
  const len = Math.max(version1Group.length, version2Group.length);
  let offset = 0;
  while (offset < len) {
    let subVersion1 = version1Group[offset] || "";
    let subVersion2 = version2Group[offset] || "";
    const equal =
      (subVersion1 === "" && /^0+$/.test(subVersion2)) ||
      (/^0+$/.test(subVersion1) && subVersion2 === "") ||
      (/^0+$/.test(subVersion2) && /^0+$/.test(subVersion1));
    // 先排除0的case
    if (equal) {
      offset++;
    } else {
      // TODO: 方向错误了，应该是从右边往左边比较，这儿有优化的空间
      const maxLength = Math.max(subVersion1.length, subVersion2.length);
      subVersion1 = subVersion1.padStart(maxLength, "0");
      subVersion2 = subVersion2.padStart(maxLength, "0");
      let k = 0;
      let num1 = subVersion1[k];
      let num2 = subVersion2[k];
      // 取短的来进行比较
      let distance = Math.min(subVersion1.length, subVersion2.length);
      while (k < distance) {
        // 左侧版本号比右侧版本号大
        if (num1 > num2) {
          return 1;
        }
        // 左侧版本号比右侧版本号小
        else if (num1 < num2) {
          return -1;
        }
        // 版本号相同，继续比较后续的
        else {
          k++;
          num1 = subVersion1[k];
          num2 = subVersion2[k];
        }
      }
      // 如果右边的比左边的长度大，说明右边的是10的整数倍的版本号，反之左边依然
      if (subVersion1.length < subVersion2.length) {
        return -1;
      } else if (subVersion1.length > subVersion2.length) {
        return 1;
      }
      // 相同，继续比较下一位
      else {
        offset++;
      }
    }
  }
  return 0;
}

/**
 * 消除前导0
 * @param str
 */
function removeZeroPrefix(str: string) {
  let offset = 0;
  while (str[offset] === "0" && offset < str.length) {
    offset++;
  }
  // 只有一个0
  return offset === str.length ? "0" : str.substring(offset);
}
