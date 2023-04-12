/**
 * 合并2个有序数组
 * @param arr1
 * @param  arr2
 */
function merge(arr1: number[], arr2?: number[]) {
  let offset1 = 0;
  let offset2 = 0;
  let offset = 0;
  let newArr: number[] = [];
  if (!Array.isArray(arr2)) {
    arr2 = [];
  }
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
   * 这两个while不可能同时成立，只有可能成立一个，将数组长度较大的剩余部分拷贝给新数组
   */
  while (offset1 < arr1.length) {
    newArr[offset++] = arr1[offset1++];
  }
  while (offset2 < arr2.length) {
    newArr[offset++] = arr2[offset2++];
  }
  return newArr;
}

export function mergerArray(arrList: Array<number[]>): number[] {
  let mergedArr = arrList;
  // 如果归并结果大于1，则需要继续进行归并
  while (mergedArr.length > 1) {
    // 本轮的归并结果
    const mergePassArr: number[][] = [];
    for (let i = 0; i < mergedArr.length; i += 2) {
      // 得到二路归并的结果
      const newArr: number[] = merge(mergedArr[i], mergedArr[i + 1]);
      mergePassArr.push(newArr);
    }
    // 将本轮的归并结果给最终的合并结果，使之可以继续下一轮归并
    mergedArr = mergePassArr;
  }
  // 如果归并0个数组，则返回空，否则返回正常的归并结果
  return mergedArr.length ? mergedArr[0] : [];
}
