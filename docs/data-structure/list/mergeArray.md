## 合并 2 个有序数组

### 描述

给你 2 个不降序数组，合并之后得到的数组仍然保持不降序的性质。

### 思路分析

首先，我们需要需要一个新的数组存储合并之后的结果，因为 JS 的数组是自动扩容的，所以我们不需要考虑数组的容量问题。然后定义两个偏移变量，用于判断合并的进程。当这两个偏移量都在对应数组的范围内时，我们分别读取两个数组当前偏移位置的数据，把小的那个加入到结果中，同时对应的偏移量+1。当一个数组已经合并完成之后，另外一个数组可能还有内容，我只需要直接将其内容追加到结果中即可。

### 算法实现

```JavaScript
/**
 * 合并2个有序数组
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
function merge(arr1, arr2) {
  let offset1 = 0;
  let offset2 = 0;
  let offset = 0;
  let newArr = [];
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
```

## 合并 K 有序个数组

给你 K 个不降序数组，合并之后得到的数组仍然保持不降序的性质。

### 思路分析

**朴素法**：每次从这个 K 数组中出一个最小的，如果当前数组为空则跳过，直到所有的数组都为空，即可完成合并。

**建堆法**：每次从这个 K 个数组的第 i 中出一个数，将其插入到一个最小堆中，当第 i 个数组为空时，继续处理下一个数组，直到所有的数组都处理完成，然后将堆中的数组依次出堆，则可得到最后的结果。

**归并法**：

每次选两个数组进行归并，将本轮归并的结果添加到一个新数组中，然后对新数组再次归并，重复这个过程，直到得到的新数组为 1 个，则这最后的一个数组则是结果。

### 算法实现

朴素法就展示代码了，有兴趣的读者可以自行实现。

建堆法的算法实现：

```JavaScript
/**
 * 抽象堆
 */
class Heap {
  get count() {
    return this.size;
  }
  /**
   * 定义哨兵的最值，所有插入堆的元素都必须和这个值比较
   */
  SENTRY;

  /**
   * 定义一个存储数据的内存空间
   */
  data = [];

  /**
   * 当前堆的元素个数
   */
  size = 0;

  /**
   * 比较函数, 通过先前和当前元素的比较，决定是否将当前元素提置先前元素前
   */
  compare;

  /**
   * 自身用于比较的函数
   * @param preVal 被比较的值
   * @param curVal 当前值
   */
  selfCompare(preVal, curVal) {
    return this.compare(preVal, curVal);
  }

  validInitParams() {
    if (this.SENTRY === void 0) {
      throw `can not insert queue before the sentry been set `;
    }
    if (this.compare === void 0) {
      throw `can not insert queue before the compare callback been set `;
    }
  }

  constructor(...initElements) {
    // 初始化数组元素
    initElements.forEach((v, i) => {
      this.data[i + 1] = v;
      this.size++;
    });
    this.buildHeap();
  }

  /**
   * 设置哨兵元素
   * @param sentryEle
   */
  setSentry(sentryEle) {
    this.SENTRY = sentryEle;
    this.data[0] = this.SENTRY;
  }

  /**
   * 设置比较函数
   * @param compareFunc 比较函数
   */
  setCompare(compareFunc) {
    this.compare = compareFunc;
  }

  /**
   * 获取堆中最小的元素
   * @returns
   */
  getTop() {
    if (this.size == 0) {
      throw `can not get element from an empty heap`;
    }
    return this.data[1];
  }

  /**
   * 判断堆是否为空
   * @returns
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * 向堆中插入一个合法值
   * @param val
   */
  insertQueue(val) {
    this.validInitParams();
    if (this.selfCompare(this.SENTRY, val)) {
      throw `can not insert val bigger or smaller than ${this.SENTRY}`;
    }
    // 堆的容量扩充1
    this.size++;
    // 让i指向当前新位置
    let i = this.size;
    // 因为有哨兵的关系，不需要添加约束条件 i > 0
    // this.#data[Math.floor(i / 2)] > val
    while (this.selfCompare(this.data[Math.floor(i / 2)], val)) {
      this.data[i] = this.data[Math.floor(i / 2)];
      i = Math.floor(i / 2);
    }
    this.data[i] = val;
  }

  /**
   * 获取堆中的最小元素
   * @returns {T}
   */
  deleteQueue() {
    if (this.isEmpty()) {
      throw "can not delete element from empty heap";
    }
    // 取出堆顶的元素
    let firstVal = this.data[1];
    let temp = this.data[this.size--];
    this.data[1] = temp;
    // JavaScript语言需要进行这一步，让数组的规模缩小，释放空间
    this.data.length--;
    this.percDown(1);
    return firstVal;
  }

  /**
   * 下滤：将堆中以堆data[p]为根的子堆调整为最小堆
   * @param p 根节点索引
   */
  percDown(p) {
    let parent, child;
    let temp = this.data[p]; /* 取出根结点存放的值 */
    for (parent = p; parent * 2 <= this.size; parent = child) {
      child = parent * 2;
      /* child指向左右子结点的较?者 */
      if (child != this.size && this.selfCompare(this.data[child], this.data[child + 1])) {
        child++;
      }
      /* 找到了合适位置 */
      if (this.selfCompare(this.data[child], temp)) {
        break;
      } else {
        /* 下滤X */
        this.data[parent] = this.data[child];
      }
    }
    this.data[parent] = temp;
  }

  /**
   * 构建堆
   */
  buildHeap() {
    /* 调整data中的元素，使满足最堆的有序性  */
    /* 这里所有size个元素已经存在data[]中 */
    /* 从最后一个结点的父节点开始，到根结点1 */
    for (let i = Math.floor(this.size / 2); i > 0; i--) {
      this.percDown(i);
    }
  }
}

/**
 * 堆元素为number的最小堆
 */
class SimpleMinHeap extends Heap {
  constructor(...initElements) {
    super(...initElements);
    this.setSentry(-Infinity);
    this.setCompare((preVal, curVal) => {
      return preVal >= curVal;
    });
  }

  deleteMin() {
    return this.deleteQueue();
  }

  getMin() {
    return this.getTop();
  }
}

/**
 * 合并K个有序数组
 * @param {number[][]} arrs
 */
function mergeKArray(arrs) {

}
```
