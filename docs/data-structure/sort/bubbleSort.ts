/**
 * 对数组进行冒泡排序
 * @param arr 需要进行排序的数组
 */
export function bubbleSort(arr: number[]) {
  let temp = -1;
  // 外层循环变量i 用于控制参与排序数据的规模
  for (let i = arr.length - 1; i >= 0; i--) {
    // 定义标记，用于判断本轮是否参与交换
    let flag = true;
    // 内层循环用于把最“重”的元素下沉至非有序片段的最后一位
    for (let j = 0; j < i; j++) {
      // 注意冒泡排序是两两相邻的比较
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        // 如果交换了元素，还需要设置标记，若数组已经有序，可以提前终止排序，提升性能
        flag = false;
      }
    }
    // 如果说没有参与交换，则认为数组已经有序，则可以完成排序
    if (flag) {
      break;
    }
  }
}
