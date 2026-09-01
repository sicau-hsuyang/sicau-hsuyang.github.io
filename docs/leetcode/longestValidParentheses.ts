/**

 动态规划的解题的核心:

 首先找到一个合法的括号字符串，那么这个合法字符串的左边界上面有可能有一个合法的最大括号字符串，
 我们把左边界上的索引计为LEFT，那么合法的字符串的长度就是:

 dp[i] = i - LEFT + 1 + (LEFT>=1  ? dp[LEFT-1] : 0)

 所以，关键就在于找这个左边界LEFT。

 为什么可以是这样，因为dp[LEFT-1]上的这个最长长度也是递推推出来的，因此不用再继续往前找

 */
export function longestValidParentheses(s){
  const dp = Array.from({
    length: s.length,
  }).fill(0);
  let maxLength = 0;
  for (let i = 0; i < s.length; i++) {
    // 左括号是无论如何都不可能凑出有效的括号的
    if (s[i] === "(") {
      dp[i] = 0;
    } else {
      // 找到平衡的，主要是为了处理这种case (()())
      let leftBracket = 0;
      let rightBracket = 1;
      let offset = i - 1;
      while (offset >= 0) {
        if (s[offset] === "(") {
          leftBracket++;
        } else {
          rightBracket++;
        }
        // 平衡的时候就可以退出了
        if (leftBracket === rightBracket) {
          break;
        }
        offset--;
      }
      if (offset >= 0) {
        let len = i - offset + 1;
        // 本次最长的合法的，加上左边的最长的合法的就是总共的合法的
        dp[i] = len + (dp[offset - 1] || 0);
        maxLength = Math.max(dp[i], maxLength);
      } else {
        dp[i] = 0;
      }
    }
  }
  return maxLength;
}