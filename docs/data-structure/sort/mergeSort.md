## 归并排序

将数组划分为若干个片段，然后不断的合并两个有序片段，得到新的结果，再在这个结果上重复此操作，直到这些片段最终合并成整个数组。

### 排序过程

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a85b0879b204016ba58fcb791fc6091~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp" />

### 算法实现

在使用递归实现归并排序时，注意我们最后一次性的传递临时数组到排序函数里面去，不要在排序函数内部申请数组进行结果的保存，因为外界传入只会处理一次，而内部申请，每个片段你都需要申请和释放空间，在数据量比较大的时候，性能不佳。

#### 递归实现

```js
/**
 * 对数组片段进行合并
 * @param {Array<number>} arr 需要进行合并的数组片段
 * @param {number} leftStart 待合并数组片段1的开始索引
 * @param {number} rightStart 待合并数组片段2的开始索引
 * @param {number} rightEnd 待合并数组片段2的结束索引
 * @param {Array<number>} tempArr 临时数组，用于记录合并有序序列
 */
function _merge(arr, leftStart, rightStart, rightEnd, tempArr) {
  // 计算出序列的总长度，用于日后将临时数组中的数据导入到数组中
  let length = rightEnd - leftStart + 1;
  // 计算出序列1结束的位置
  let leftEnd = rightStart - 1;
  // 记录序列的开始位置
  let pos = leftStart;
  while (leftStart <= leftEnd && rightStart <= rightEnd) {
    // 将数组中的元素按特定的规则复制到临时数组里面去
    if (arr[leftStart] >= arr[rightStart]) {
      tempArr[pos++] = arr[rightStart++];
    } else {
      tempArr[pos++] = arr[leftStart++];
    }
  }

  // 两个while不可能同时成立，只拷贝较长的部分
  while (leftStart <= leftEnd) {
    tempArr[pos++] = arr[leftStart++];
  }

  while (rightStart <= rightEnd) {
    tempArr[pos++] = arr[rightStart++];
  }

  // 因为最后合并完成之后pos指向的是最后一个元素的下一位，因此，需要将其减1
  for (let i = pos - 1, k = 0; k < length; k++, i--) {
    // 将临时数组的数据导入到真实数组里面去
    arr[i] = tempArr[i];
  }
}

/**
 * 对数组片段进行归并排序
 * @param {Array<number>} arr 需要进行排序的数组
 * @param {number} left 待排序数组片段的开始索引
 * @param {number} right 待排序数组片段的结束索引
 */
function _mergeSort(arr, left, right) {
  if (left >= right) {
    return;
  }
  let center = Math.floor((left + right) / 2);
  let tempArr = [];
  // 递归的对左半部分进行归并排序
  _mergeSort(arr, left, center);
  // 递归的对右半部分进行归并排序
  _mergeSort(arr, center + 1, right);
  // 合并两个有序数组
  _merge(arr, left, center + 1, right, tempArr);
}

/**
 * 对数组进行归并排序
 * @param {Array<number>} arr 需要进行排序的数组
 */
function mergeSort(arr) {
  _mergeSort(arr, 0, arr.length - 1);
}
```

#### 非递归实现

本例中，在`_merge`函数中并没有进行把临时数组导回至原数组的操作，在`while`循环中，巧妙地利用了临时数据已经被排序过的特点，下次排序直接利用它，并且再把排序的数据导回至原数组，减少了数组元素的拷贝次数。

```js
/**
 * 合并两个有序片段，存到tmpArr中
 * @param {Array<number>} arr
 * @param {number} leftStart
 * @param {number} rightStart
 * @param {number} rightEnd
 * @param {Array<number>} tmpArr
 */
function _merge(arr, leftStart, rightStart, rightEnd, tmpArr) {
  let pos = leftStart;
  let leftEnd = rightStart - 1;
  while (leftStart <= leftEnd && rightStart <= rightEnd) {
    if (arr[leftStart] >= arr[rightStart]) {
      tmpArr[pos++] = arr[rightStart++];
    } else {
      tmpArr[pos++] = arr[leftStart++];
    }
  }
  while (leftStart <= leftEnd) {
    tmpArr[pos++] = arr[leftStart++];
  }
  while (rightStart <= rightEnd) {
    tmpArr[pos++] = arr[rightStart++];
  }
}

/**
 * 一次归并两个有序片段
 * @param {Array<number>} arr 待排序数组
 * @param {number} sliceSize 每个块的长度
 * @param {Array<number>} tmpArr 临时数组
 */
function _mergePass(arr, sliceSize, tmpArr) {
  let i = 0;
  // 只合并到倒数第二或者倒数第一个块之前的块
  while (i <= arr.length - 2 * sliceSize) {
    /* 两两归并相邻有序子列 */
    _merge(arr, i, i + sliceSize, i + 2 * sliceSize - 1, tmpArr);
    // 每次跨2个序列块
    i += 2 * sliceSize;
  }
  if (i + sliceSize < arr.length) {
    /* 说明刚好，当前chunk数是 2倍块数的整数倍 归并最后2个子列*/
    _merge(arr, i, i + sliceSize, arr.length - 1, tmpArr);
  } else {
    /* 还差点儿，直接把最后只剩1个子序列导到临时数组即可 */
    for (let j = i; j < arr.length; j++) {
      tmpArr[j] = arr[j];
    }
  }
}

/**
 * 归并排序 非递归实现
 * @param {Array<number>} arr
 */
function mergeSort(arr) {
  /* 初始化子序列长度*/
  let slice = 1;
  let tmpArr = [];
  /**
   * 块的size从1增长到length
   */
  while (slice < arr.length) {
    // 一轮归并
    _mergePass(arr, slice, tmpArr);
    slice *= 2;
    /* 翻滚两次，这个地方不仅在排序，还完成了把tmpArr的内容导回至arr的事儿, 如果原数据已经有序，仅完成导回操作。*/
    _mergePass(tmpArr, slice, arr);
    slice *= 2;
  }
}
```

### 复杂度与稳定性

归并排序是稳定的排序算法；

平均算法时间复杂度: O(N\*logN)，空间复杂度: O(N)

归并排序的缺点就是因为有额外的空间复杂度。

我们各类的语言底层（如 JS 的`Array.prototype.sort`）提供的排序算法就是根据不同排序算法的稳定性、时间复杂度、空间复杂度差异，根据待排数据的性质，在三者之间进行取舍，从而实现更加高效的排序算法。
