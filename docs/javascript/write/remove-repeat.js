/**
 * 有序数组去重
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
function removeRepeat(arr1, arr2) {
  let offset1 = 0;
  let offset2 = 0;
  const result = [];
  while (offset1 < arr1.length && offset2 < arr2.length) {
    let v1 = arr1[offset1];
    let v2 = arr2[offset2];
    if (v1 === v2) {
      result.push(v1);
      offset1++;
      offset2++;
    } else if (v1 < v2) {
      result.push(v1);
      offset1++;
    } else if (v2 < v1) {
      result.push(v2);
      offset2++;
    }
  }
  while (offset1 < arr1.length) {
    result.push(arr1[offset1++]);
  }
  while (offset2 < arr2.length) {
    result.push(arr2[offset2++]);
  }
  return result;
}

const res1 = removeRepeat([1, 2, 3], [3]);

const res2 = removeRepeat([1, 2, 3], [3, 4, 5]);

const res3 = removeRepeat([3], [3, 4, 5, 8]);

const res4 = removeRepeat([-1, 2], [3, 4, 5, 8]);

console.log(res1, res2, res3, res4);
