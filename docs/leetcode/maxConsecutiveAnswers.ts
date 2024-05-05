export function maxConsecutiveAnswers(answerKey: string, k: number): number {
  const dict: string = "TF";
  let maxDistance = 0;
  let len = answerKey.length;
  for (let i = 0; i < dict.length; i++) {
    let left = 0;
    let windowK = k;
    const Standard = dict[i];
    for (let right = 0; right < len; right++) {
      const char = answerKey[right];
      // 如果不等于目标字符的，还没有达到最大的限制，则替换
      if (char !== Standard && windowK > 0) {
        windowK--;
      }
      // 如果不等于目标字符的，达到最大的限制，则计算规则
      else if (char !== Standard && windowK === 0) {
        const D = right - left;
        if (D > maxDistance) {
          console.log(answerKey.substring(left, right));
          maxDistance = D;
        }
        // 当前进来的字符已经是不满足要求的了，要从窗口里面释放一个字符串，以仍然满足窗口的要求
        // 向右找到第一个不是当前相同字符串的字符串
        while (answerKey[left] === Standard) {
          left++;
        }
        // 跳过第一个不符合要求的字符
        left++;
      }
    }
    const D = len - left;
    if (D > maxDistance) {
      console.log(answerKey.substring(left, len));
      maxDistance = D;
    }
  }
  return maxDistance;
}
