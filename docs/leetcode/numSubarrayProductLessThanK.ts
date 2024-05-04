export function numSubarrayProductLessThanK(nums: number[], k: number): number {
  // 考虑边界条件，因为题设给出的条件，任何一个元素都大于等于1，因此求k为0或者1的时候是肯定没有解的，就不用考虑了
  if (k <= 1) {
    return 0;
  }
  let total = 0;
  let acmVal = 1;
  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    const num = nums[right];
    // 直接将进入窗口的值加入到窗口中去
    acmVal *= num;
    // 如果窗口中已经有元素超过了k的话，一直从窗口中移除元素
    // 运气好，移除一个就可以了，运气不好，窗口里面有个元素直接就比k大，那么将清空窗口
    while (acmVal >= k) {
      acmVal /= nums[left];
      left++;
    }
    // for (let i = left; i <= right; i++) {
    //   total++;
    //   console.log(nums.slice(i, right + 1));
    // }
    //// 因为窗口里面的每个元素都比k小，所以，每个又可能单独组成解，因此，需要从窗口的左侧计算到右侧
    //// 因为是仅仅计算次数，并没有要求求出真正的解的方案，因此就不用for循环打印了
    total += right - left + 1;
  }
  return total;
}
