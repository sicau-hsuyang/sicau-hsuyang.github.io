## 快速排序

若数组片段的长度大于 1，则随机从数组片段中取出一个元素作为`主元(pivot)`，将数组分为两份 A,B，这个位置之前的为一份(A)，这个位置之后的为一份(B)，**将 A 中所有比 pivot 大的元素全部放到 B 中**，**将 B 中比 pivot 小的元素全部放大 A 中**，然后分别递归的对数组片段 A 和 B 分别重复这个过程，直到所有的元素都有序即完成排序。

快速排序是基于分治思想的排序算法。

### 排序过程

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/066bb790e83446819eb655c22105411c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" />

### 算法实现

#### 朴素法

朴素法虽然比较好理解，也比较好记忆，但是实际上并不快，因为每次都简单的按特定的规则选取主元，如果主元的选择情况并不好的话，那我们的快速排序算法就跟冒泡排序差不多了。

```js
/**
 * 对数组片段进行快速排序
 * @param {Array<number>} arr 需要进行排序的数组
 * @param {number} left 待排序数组片段的开始索引
 * @param {number} right 待排序数组片段的结束索引
 */
function _quickSort(arr, left, right) {
  // 如果数组片段的长度小于或者等于1，无需进行排序
  if (left >= right) {
    return;
  }
  // 随机取一个元素作为主元
  let pivot = arr[left];
  let i = left;
  let j = right;
  while (i < j) {
    // 从数组片段右侧找比主元小的元素
    while (i < j && arr[j] > pivot) {
      j--;
    }
    // 说明此刻已经找到了比主元小的元素
    if (i < j) {
      arr[i] = arr[j];
      // 缩小规模
      i++;
    }
    // 从数组片段左侧找比主元大的元素
    while (i < j && arr[i] < pivot) {
      i++;
    }
    // 说明找到了比主元大的元素
    if (i < j) {
      arr[j] = arr[i];
      j--;
    }
  }
  // 当退出循环的时候，i == j, 此刻这个位置之前所有的元素都比主元小，这个位置之后的所有元素都比主元大，这个位置就是我们存放主元的位置
  arr[i] = pivot;
  // 递归的对左半部分元素进行快速排序
  _quickSort(arr, left, i - 1);
  // 递归的对右半部分元素进行快速排序
  _quickSort(arr, i + 1, right);
}

/**
 * 对数组进行快速排序
 * @param {Array<number>} arr 需要进行排序的数组
 */
function quickSort(arr) {
  _quickSort(arr, 0, arr.length - 1);
}
```

#### 三元取中法

```js
/**
 * 定义数据的规模，如果少于这个量，则用简单排序，否则使用快速排序
 */
const N = 50;
/**
 * 定义直接插入排序的方法，此直接插入排序方法和普通的插入排序有区别，因为是针对数组的某一个片段进行排序，因此需要引入一个offset偏移量参数
 * @param {Array} arr 待排序数组
 * @param {Number} offset 初始偏移量
 * @param {Number} length 待排序片段的总长度
 */
function _insertionSort(arr, offset, length) {
  let temp, i;
  for (let p = offset + 1; p < offset + length; p++) {
    temp = arr[p];
    for (i = p; i > offset && temp < arr[i - 1]; i--) {
      arr[i] = arr[i - 1];
    }
    arr[i] = temp;
  }
}

/**
 * 三元取中法获取主元
 */
function _mediant3(arr, left, right) {
  let center = Math.floor((left + right) / 2);
  if (arr[left] > arr[right]) {
    _swap(arr, left, right);
  }

  if (arr[left] > arr[center]) {
    _swap(arr, left, center);
  }

  if (arr[center] > arr[right]) {
    _swap(arr, right, center);
  }
  // 并且把主元藏在数组片段的倒数第二位
  _swap(arr, right - 1, center);
  return arr[right - 1];
}

/**
 * 交换数组中的2个元素
 */
function _swap(arr, i, j) {
  let temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}

/**
 * 对数组片段进行快速排序
 */
function _quickSort(arr, left, right) {
  // 数据片段的长度
  let len = right - left + 1;
  // 如果数据规模少于它，则使用简单排序
  if (len <= N) {
    _insertionSort(arr, left, len);
  } else {
    // 使用三元法获取主元
    let pivot = _mediant3(arr, left, right);
    let i = left;
    let j = right - 1;
    while (true) {
      while (arr[--j] > pivot);
      while (arr[++i] < pivot);
      if (i >= j) {
        break;
      }
      _swap(arr, i, j);
    }
    _swap(arr, i, right - 1);
    _quickSort(arr, left, i - 1);
    _quickSort(arr, i + 1, right);
  }
}

/**
 * 对数组进行快速排序
 */
function quickSort(arr) {
  _quickSort(arr, 0, arr.length - 1);
}
```

### 复杂度与稳定性

快速排序是不稳定的排序算法

平均算法时间复杂度：O(n\*logn),最坏：O(N²)
