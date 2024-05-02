export function longestOnes(nums: number[], k: number): number {
  let maxDistance = 0;
  let left = 0;
  let windowK = k;
  for (let right = 0; right < nums.length; right++) {
    const num = nums[right];
    if (num !== 1) {
      // 执行替换操作
      windowK--;
      // 如果替换的次数已经用完了，向后滑动，这儿需要注意一个点，
      // 比如 [1,1,1,0,0,0, 0] 假设K=4，此刻如果有一个0进来的话，要想继续保持最大替换K个窗口，那么，我们必须要丢弃1,1,1,0，直到窗口内
      // 的元素为0,0,0,0，所以必须使用的是while循环
      while (windowK < 0) {
        if (nums[left] !== 1) {
          windowK++;
        }
        left++;
      }
    }
    let D = right - left + 1;
    if (D > maxDistance) {
      console.log(nums.slice(left, right + 1));
      maxDistance = D;
    }
  }
  return maxDistance;
}
