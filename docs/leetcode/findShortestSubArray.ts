export function findShortestSubArray(nums: number[]): number {
  const map: Map<number, number> = new Map();
  nums.forEach((num) => {
    const count = map.get(num) || 0;
    if (count > 0) {
      map.set(num, count + 1);
    } else {
      map.set(num, 1);
    }
  });
  // 先找到数组的度
  let degree: number[] = [];
  // 最大频率
  let maxFrequency = 0;
  for (const [prop, value] of map.entries()) {
    // 如果新来的最大频率比当前的大，则更新最大频率
    if (value > maxFrequency) {
      maxFrequency = value;
      degree = [prop];
    }
    // 如果出现相同的，先别着急丢
    else if (value === maxFrequency) {
      degree.push(prop);
    }
  }
  const maxLength = Math.min(...getSubArray(nums, degree));
  return maxLength;
}

function getSubArray(nums: number[], degrees: number[]) {
  return degrees.map((degree) => {
    return getSubArrayOnce(nums, degree);
  });
}

/**
 * 获取一个数组度的结果
 * @param nums
 * @param degree
 */
function getSubArrayOnce(nums: number[], degree: number) {
  let left = 0;
  let right = nums.length - 1;
  // 从左边剔除
  while (left < nums.length && nums[left] !== degree) {
    left++;
  }
  // 从右边剔除
  while (right > 0 && nums[right] !== degree) {
    right--;
  }
  return right - left + 1;
}
