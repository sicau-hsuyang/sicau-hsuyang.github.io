## 选择排序

从无序片段中找到`最值`所在的位置，将无序片段的第一个元素与最值元素进行交换，**有序片段规模递增 1**，**无序片段规模递减 1**，直到所有元素有序则完成排序。

### 排序过程

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0200bf4394844db6a57ba1bc395829f4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" />

### 算法实现

```js
/**
 * 对数组进行选择排序
 * @param {Array<number>} arr 需要进行排序的数组
 */
function selectionSort(arr) {
  let temp = null;
  for (let i = 0; i < arr.length; i++) {
    // 假设无序片段的第一个元素是最值，从后面的序列中找一个最值与其交换
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
}
```

需要注意的是，选择排序排在排序时，不是和相邻元素进行交换的，注意和[冒泡排序](/data-structure/sort/bubbleSort)的区别

### 复杂度与稳定性

选择排序的时间复杂度是`O(n²)`，是`稳定`的排序算法。
