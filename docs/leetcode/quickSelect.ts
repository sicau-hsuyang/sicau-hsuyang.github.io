export module QuickSelectByIndex {
  /**
   * 求一个数组中排名为K的元素
   * @param arr 元素中
   * @param k 排名，即索引
   * @returns
   */
  export function quickSelect(arr: number[], k: number): number {
    return _quickSelect(arr, 0, arr.length - 1, k);
  }
  /**
   * 快速选择
   * @param arr
   * @param left
   * @param right
   * @param k
   * @returns
   */
  function _quickSelect(arr: number[], left: number, right: number, k: number) {
    if (left === right) {
      return arr[left];
    }
    let pivotIdx = partition(arr, left, right);
    const distance = pivotIdx - left + 1;
    if (distance === k) {
      return arr[pivotIdx];
    } else if (distance > k) {
      return _quickSelect(arr, left, pivotIdx - 1, k);
    } else if (distance < k) {
      return _quickSelect(arr, pivotIdx + 1, right, k - distance);
    }
  }

  /**
   * 分区，并返回分界线的下标
   * @param arr 原数组
   * @param left 数组的左边下标
   * @param right 数组的右边下标
   * @returns
   */
  function partition(arr: number[], left: number, right: number): number {
    let idx = left;
    let pivot = arr[right];
    for (let i = left; i < right; i++) {
      if (arr[i] < pivot) {
        [arr[i], arr[idx]] = [arr[idx], arr[i]];
        idx++;
      }
    }
    [arr[idx], arr[right]] = [arr[right], arr[idx]];
    return idx;
  }
}

export module QuickSelectByNumber {
  export function quickSelect(arr: number[], k: number): number {
    return _quickSelect(arr, 0, arr.length - 1, k);
  }
  /**
   * 快速选择
   * @param arr
   * @param left
   * @param right
   * @param k
   * @returns
   */
  function _quickSelect(arr: number[], left: number, right: number, k: number) {
    if (left === right) {
      return arr[left];
    }
    let pivotIdx = partition(arr, left, right);
    if (pivotIdx === k) {
      return arr[pivotIdx];
    } else if (pivotIdx > k) {
      return _quickSelect(arr, left, pivotIdx - 1, k);
    } else if (pivotIdx < k) {
      return _quickSelect(arr, pivotIdx + 1, right, k);
    }
  }

  /**
   * 分区，并返回分界线的下标
   * @param arr 原数组
   * @param left 数组的左边下标
   * @param right 数组的右边下标
   * @returns
   */
  function partition(arr: number[], left: number, right: number): number {
    let idx = left;
    let pivot = arr[right];
    for (let i = left; i < right; i++) {
      if (arr[i] < pivot) {
        [arr[i], arr[idx]] = [arr[idx], arr[i]];
        idx++;
      }
    }
    [arr[idx], arr[right]] = [arr[right], arr[idx]];
    return idx;
  }
}
