/*
 * 最小堆
 */
class MinHeap {
  /**
   * 定义一个存储数据的内存空间
   */
  _data = [];

  /**
   * 比较函数
   */
  _compare = null;

  get size() {
    return this._data.length;
  }

  constructor(...nums) {
    // 初始化数组元素
    nums.forEach((v) => {
      this._data.push(v);
    });
    this.buildHeap();
  }

  _selfCompare = (compareVal, currentVal) => {
    return typeof this._compare === "function"
      ? this._compare(compareVal, currentVal)
      : compareVal <= currentVal;
  };

  /**
   * 设置比较函数
   * @param {(compareVal, currentVal) => boolean} compareFunc
   */
  setCompare(compareFunc) {
    this._compare = compareFunc;
  }

  getMin() {
    return this._data[0];
  }

  isEmpty() {
    return this._data.length === 0;
  }

  /**
   * 向堆中插入一个合法值
   * @param {number} val
   */
  insert(val) {
    // 如果当前元素
    if (this._data.length === 0) {
      this._data[0] = val;
    } else {
      // 堆的容量扩充1
      // 让i指向当前新位置
      let i = this.size;
      while (this._selfCompare(val, this._data[Math.floor(i / 2)]) && i > 0) {
        this._data[i] = this._data[Math.floor(i / 2)];
        i = Math.floor(i / 2);
      }
      this._data[i] = val;
    }
  }

  /**
   * 获取堆中的最小元素
   * @returns
   */
  deleteMin() {
    if (this.isEmpty()) {
      console.warn("can not delete max from empty heap");
      return;
    }
    // 取出堆顶的元素
    let minVal = this._data[0];
    let temp = this._data[this.size - 1];
    this._data[0] = temp;
    // JavaScript语言需要进行这一步，让数组的规模缩小，释放空间
    this._data.length--;
    // 如果当前堆里面还存在元素的话，将
    this.percDown(0);
    return minVal;
  }

  /**
   * 下滤：将堆中以堆data[p]为根的子堆调整为最小堆
   * @param {number} p 根节点索引
   */
  percDown(p) {
    // 如果当前堆元素小于1个，就不执行调整操作
    if (this.size <= 1) {
      return;
    }
    let parent, child;
    /* 取出根结点存放的值 */
    let temp = this._data[p];
    for (parent = p; parent * 2 < this.size; parent = child) {
      child = parent * 2;
      if (
        child + 1 < this.size &&
        this._selfCompare(this._data[child + 1], this._data[child])
      ) {
        child++; /* child指向左右子结点的较大者 */
      }
      /* 找到了合适位置 */
      // temp <= this.#data[child]
      if (this._selfCompare(temp, this._data[child])) {
        break;
      } else {
        /* 下滤X */
        this._data[parent] = this._data[child];
      }
    }
    this._data[parent] = temp;
  }

  /**
   * 构建最小堆
   */
  buildHeap() {
    /* 调整data中的元素，使满足最小堆的有序性  */
    /* 这里所有size个元素已经存在data[]中 */
    /* 从最后一个结点的父节点开始，到根结点1 */
    for (let i = Math.floor(this.size / 2); i > 0; i--) {
      this.percDown(i);
    }
  }
}

const minHeap = new MinHeap();

// minHeap.setCompare((compareVal, currentVal) => {
//   return currentVal.val - compareVal.val >= 0;
// });

minHeap.setCompare((compareVal, currentVal) => {
  return currentVal - compareVal >= 0;
});

// minHeap.insert({
//   val: 1,
// });

// minHeap.insert({
//   val: 2,
// });

// minHeap.insert({
//   val: 3,
// });

// minHeap.insert({
//   val: 4,
// });

// console.log(minHeap.deleteMin());

// console.log(minHeap.deleteMin());

// console.log(minHeap.deleteMin());

// console.log(minHeap.deleteMin());

// debugger;

// console.log(minHeap);
let data = [4, 1, -1, 2, -1, 2, 3];
for (let i = 0; i < data.length; i++) {
  minHeap.insert(data[i]);
}

// let lastVal = 0;

while (!minHeap.isEmpty()) {
  let val = minHeap.deleteMin();
  console.log(val);
  // console.log(val - lastVal);
  // lastVal = val;
}
