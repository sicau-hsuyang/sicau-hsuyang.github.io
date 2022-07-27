## 堆排序

将数组片段在线性的时间内调整成`最大（小）堆`，取出堆顶的元素和数组无序片段的最后一个元素进行交换，有序片段规模增加 1，无序片段规模减少 1，再将剩余的无序片段元素调整成最大（小）堆，重复这个操作，直到无序片段为空则完成排序。

### 排序过程

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2d40b443d7740dba5b48bc1a1ff0433~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp"  />

### 算法实现

```JS
/**
 * 将长度为length的数组片段以p为根节点构建最大堆
 * @param {Array<number>} arr 需要进行排序的数组
 * @param {number} p 根节点
 * @param {number} length 数组片段的长度
 */
function percDown(arr, p, length) {
  let temp = arr[p];
  let child, parent;
  // 从p节点开始，如果parent*2等于length的话，说明堆已经越界，无需进行循环
  for (parent = p; parent * 2 < length; parent = child) {
    // 找到左儿子节点所在的索引
    child = parent * 2;
    // 右儿子存在,并且右儿子比左儿子大，则取右儿子
    if (child + 1 < length && arr[child] < arr[child + 1]) {
      child++;
    }
    // 如果待插入的值比当前这个位置大或者相等，则说明这个位置就是可以插入的位置,不能再继续下滤了，因此退出循环
    if (temp >= arr[child]) {
      break;
    } else {
      // 把大的值向上提
      arr[parent] = arr[child];
    }
    // 节点下滤
  }
  // 把元素放在合适的位置
  arr[parent] = temp;
}

/**
 * 对数组进行堆排序
 * @param {Array<number>} arr 需要进行排序的数组
 */
function heapSort(arr) {
  // 因为在没有哨兵时，对于父节点为i的节点，其左右儿子分别是 2i+1, 2i+2，那我们可以根据最后一个元素算出，最后一个元素的父节点是 Math.floor(arr.length / 2)
  // 从最后一个元素的父元素开始，在线性的时间内将数组调整成最大堆,
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    percDown(arr, i, arr.length);
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    // 取出堆顶的第一个元素
    let temp = arr[0];
    // 将无序片段最后一个元素交换到堆顶
    arr[0] = arr[i];
    arr[i] = temp;
    // 继续将长度为i的元素片段，以0为根节点，调整成最大堆
    percDown(arr, 0, i);
    // 最后无序片段的规模递减
  }
}
```

### 复杂度与稳定性

堆排序是不稳定的排序算法；

**定理: 堆排序处理 N 个不同元素的随机排列的平均比较次数是 2N\*logN-O(N\*log(logN))**

堆排序的复杂度可以写成 O(N\*logN)，而且比这个复杂度要比 O(N\*logN)略好一些。

平均算法复杂度：O(N\*logN)，无额外的空间复杂度
