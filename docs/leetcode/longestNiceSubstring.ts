function validKey(map: Map<string, number>) {
  for (const key of map.keys()) {
    const lowerKey = key.toLowerCase();
    const upperKey = key.toUpperCase();
    // 必须同时有2个大小写的key
    if (
      (!map.has(lowerKey) && map.has(upperKey)) ||
      (map.has(lowerKey) && !map.has(upperKey))
    ) {
      return false;
    }
  }
  return true;
}

export function longestNiceSubstring(s: string): string {
  let distLeft = -1;
  let distRight = -1;
  let maxDistance = 0;
  let len = Math.min(s.length, 100);
  for (let k = 2; k <= len; k++) {
    const map: Map<string, number> = new Map();
    let left = 0;
    for (let i = 0; i < k; i++) {
      const char = s[i];
      const count = map.get(char) || 0;
      if (count === 0) {
        map.set(char, 1);
      } else {
        map.set(char, count + 1);
      }
    }
    if (validKey(map) && k > maxDistance) {
      // console.log(s.substring(left, k));
      maxDistance = k;
      distLeft = left;
      distRight = k;
    }
    for (let i = k; i < len; i++) {
      const removeChar = s[left];
      const insertChar = s[i];
      // console.log(removeChar, insertChar);
      let count = map.get(insertChar) || 0;
      const removeCount = map.get(removeChar)!;
      if (removeCount === 1) {
        map.delete(removeChar);
      } else {
        map.set(removeChar, removeCount - 1);
      }
      // 如果增加和删除操作的是同一个元素的话，需要对已有的元素递减
      if (insertChar === removeChar) {
        count--;
      }
      if (count === 0) {
        map.set(insertChar, 1);
      } else {
        map.set(insertChar, count + 1);
      }
      left++;
      if (validKey(map) && k > maxDistance) {
        // console.log(s.substring(left, i + 1));
        maxDistance = k;
        distLeft = left;
        distRight = i + 1;
      }
    }
  }
  return distLeft === distRight && distLeft === -1
    ? ""
    : s.substring(distLeft, distRight);
}
