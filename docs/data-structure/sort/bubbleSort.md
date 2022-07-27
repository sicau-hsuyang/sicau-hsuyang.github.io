## 冒泡排序

冒泡排序每轮循环把最`重`（取决于你对重的定义）的元素下沉到`有序片段`的前一位，`无序数据片段规模递减 1`，`有序数据片段规模递增 1`，直到所有的元素都有序则完成排序。

### 排序过程

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/467e9f96f84247e18a0e1829b128a254~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp"/>

### 算法实现

```js
/**
 * 对数组进行冒泡排序
 * @param {Array<number>} arr 需要进行排序的数组
 */
function bubbleSort(arr) {
  let temp = null;
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
```

需要注意的是冒泡排序在排序过程中，下沉元素时，是和相邻的元素进行比较，请注意区分[选择排序](/data-structure/sort/selectionSort)，如果数据已经有序，需要提前终止排序。

### 复杂度与稳定性

冒泡排序的时间复杂度是`O(n²)`，是`稳定`的排序算法。
