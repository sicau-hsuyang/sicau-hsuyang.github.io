/**
 * 合并2个有序数组
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
function merge(arr1, arr2) {
  let offset1 = 0;
  let offset2 = 0;
  let offset = 0;
  let newArr = [];
  // 当两个数组都还没有处理完成的时候
  while (offset1 < arr1.length && offset2 < arr2.length) {
    let val1 = arr1[offset1];
    let val2 = arr2[offset2];
    if (val1 >= val2) {
      newArr[offset++] = arr2[offset2++];
    } else {
      newArr[offset++] = arr1[offset1++];
    }
  }
  /**
   * 这两个while不可能同时成立，只有可能成立一个，将数组长度较大的那个拷贝给新数组
   */
  while (offset1 < arr1.length) {
    newArr[offset++] = arr1[offset1++];
  }
  while (offset2 < arr2.length) {
    newArr[offset++] = arr2[offset2++];
  }
  return newArr;
}
