export function findTheLongestSubstring(s: string): number {
  // 最小的奇数的位置
  let minOddPos = -1;
  let counter = 0;
  let maxDistance = 0;
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    let flag = false;
    // 当前是元音字符
    if ("aeiou".indexOf(char) >= 0) {
      flag = true;
      counter++;
      // 如果当前位置是奇数
      if (counter === 1) {
        minOddPos = i;
        continue;
      }
    }

    // 偶数个元音字符，包含0个
    if (counter % 2 === 0) {
      let D = i + 1;
      if (D > maxDistance) {
        maxDistance = D;
        console.log(s.substring(0, D), D);
      }
    }
    // 当前个数是奇数个，并且第一个奇数个的位置存在
    else if (counter % 2 !== 0 && counter > 1 && minOddPos !== -1) {
      let D = i - minOddPos;
      if (D > maxDistance) {
        maxDistance = D;
        console.log(s.substring(minOddPos + 1, minOddPos + 1 + D), D);
      }
    }
  }
  return maxDistance;
}
