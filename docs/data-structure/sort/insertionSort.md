## 插入排序

取出从无序序列中的第一个元素，有序片段的规模加 1，在**有序片段中找到该元素合适的插入位置进行插入**，无序片段的规模减 1，下次又从无序片段的第一个元素开始排序，重复这个操作直到**无序片段长度为 0**， 则完成排序。

### 排序过程

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53f73c40913443afbe94f1bb43c7bbb7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" />

### 算法实现

```js
/**
 * 对数组进行插入排序
 * @param {Array<number>} arr 需要进行排序的数组
 */
function insertionSort(arr) {
  // 默认认为第一个元素已经有序
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    let cur = arr[i];
    //向前找合适的插入位置，退出条件有两种可能，1、找到了合适的插入位置；2、找到了头了
    while (j > 0 && arr[j - 1] > cur) {
      // 在每次查找插入位置的时候，都将当前元素向后挪一位。
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = cur;
  }
}
```

### 复杂度与稳定性

插入排序的时间复杂度是`O(n²)`，是`稳定`的排序算法。
