export function searchMatrix(matrix: number[][], target: number): boolean {
  // 分别找到4个值的范围
  const topRight = matrix[0][matrix[0].length - 1];
  const topLeft = matrix[0][0];
  const bottomLeft = matrix[matrix.length - 1][0];
  const bottomRight = matrix[matrix.length - 1][matrix[0].length - 1];
  // 不在范围内
  if (target < topLeft || target > bottomRight) {
    return false;
  }
  // 如果刚好在四个角上
  if ([topLeft, topRight, bottomLeft, bottomRight].includes(target)) {
    return true;
  }
  if (matrix.length === 1) {
    return binarySearchOnlySingleColumn1(matrix[0], target) !== -1;
  }
  if (matrix[0].length === 1) {
    return binarySearch(0, matrix, target) !== -1;
  }
  /**
   * 如果介于左上半区
   */
  if (target > topLeft && target < topRight) {
    let left = 0;
    let right = matrix[0].length - 1;
    // 中间索引
    let mid = Math.floor((left + right) / 2);
    while (left < right) {
      let midVal = matrix[0][mid];
      if (midVal === target) {
        return true;
      } else if (midVal > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
      mid = Math.floor((left + right) / 2);
    }
    // 从第0列找到第K列
    for (let k = 0; k <= left; k++) {
      // 在某一列上进行二分查找
      const res = binarySearch(k, matrix, target);
      if (res !== -1) {
        return true;
      }
    }
  }
  // 如果位于右下半区
  else {
    let left = 0;
    let right = matrix[matrix.length - 1].length - 1;
    // 中间索引
    let mid = Math.floor((left + right) / 2);
    while (left < right) {
      let midVal = matrix[matrix.length - 1][mid];
      if (midVal === target) {
        return true;
      } else if (midVal > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
      mid = Math.floor((left + right) / 2);
    }
    //从第K列找到最后一列
    for (let k = left; k < matrix[0].length; k++) {
      // 在某一列上进行查找
      const res = binarySearch(k, matrix, target);
      if (res !== -1) {
        return true;
      }
    }
  }
  return false;
}

/**
 * 二分查找
 * @param nums
 * @param target
 * @returns
 */
function binarySearch(col: number, matrix: number[][], target: number): number {
  let left = 0;
  let right = matrix.length - 1;
  let mid = Math.floor((left + right) / 2);
  let midVal = matrix[mid][col];
  let result = -1;
  while (left <= right) {
    if (midVal === target) {
      result = mid;
      break;
    } else if (midVal > target) {
      right = mid - 1;
    } else if (midVal < target) {
      left = mid + 1;
    }
    mid = Math.floor((left + right) / 2);
    if (!Array.isArray(matrix[mid])) {
      break;
    }
    midVal = matrix[mid][col];
  }
  return result;
}

/**
 * 二分查找
 * @param nums
 * @param target
 * @returns
 */
function binarySearchOnlySingleColumn1(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  let mid = Math.floor((left + right) / 2);
  let midVal = nums[mid];
  let result = -1;
  while (left <= right) {
    if (midVal === target) {
      result = mid;
      break;
    } else if (midVal > target) {
      right = mid - 1;
    } else if (midVal < target) {
      left = mid + 1;
    }
    mid = Math.floor((left + right) / 2);
    midVal = nums[mid];
  }
  return result;
}
