/**
 *
 */
function sum(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  const group = [];
  while (start < end) {
    let a = arr[start];
    let b = arr[end];
    let tempSum = a + b;
    if (tempSum < target) {
      start++;
    } else if (tempSum > target) {
      end--;
    } else {
      start++;
      end--;
      group.push([a, b]);
    }
  }
  return group;
}

/**
 * [1,2,3,4,5,6,7,8,9,10,11,12] 5
 */
