export function equalSubstring(s: string, t: string, maxCost: number): number {
  let maxDistance = 0;
  let left = 0;
  let currentCost = maxCost;
  let len = s.length;
  for (let right = 0; right < len; right++) {
    let code1 = s.charCodeAt(right);
    let code2 = t.charCodeAt(right);
    const cost = Math.abs(code1 - code2);
    // 如果即将超标的话，需要一直丢弃最远的字符
    while (currentCost < cost && left < right) {
      // 仍然是不需要计算当前即将进入窗口的字符，因此不是right-left+1，而是right-left
      let D = right - left;
      if (D > maxDistance) {
        // console.log(s.substring(left, right));
        maxDistance = D;
      }
      let leftCode1 = s.charCodeAt(left);
      let leftCode2 = t.charCodeAt(left);
      // 即将离开的花费
      const removeCost = Math.abs(leftCode1 - leftCode2);
      currentCost += removeCost;
      left++;
    }
    if (currentCost >= cost) {
      // 将当前的花费增加到总共的花费中
      currentCost -= cost;
    } else {
      left = right + 1;
    }
  }
  // 如果一直到最后都是OK的话，尝试算一下最后的case
  if (currentCost >= 0) {
    let D = len - left;
    if (D > maxDistance) {
      // console.log(s.substring(left, len));
      maxDistance = D;
    }
  }
  return maxDistance;
}
