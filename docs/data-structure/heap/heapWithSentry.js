/*
 * 最小堆
 */
class MinHeap {
  /**
   * 定义哨兵的最大值，所有插入堆的元素都必须比这个值小
   */
  #MAX_VAL = -Infinity;

  /**
   * 定义一个存储数据的内存空间
   */
  #data = [];

  /**
   * 当前堆的元素个数
   */
  #size = 0;

  /**
   * 比较函数
   */
  #compare = null;

  get size() {
    return this.#size;
  }

  constructor(...nums) {
    // 设置哨兵
    this.#data[0] = this.#MAX_VAL;
    // 初始化数组元素
    nums.forEach((v, i) => {
      this.#data[i + 1] = v;
      this.#size++;
    });
    this.buildHeap();
  }

  #selfCompare = (compareVal, currentVal) => {
    return typeof this.#compare === "function"
      ? this.#compare(compareVal, currentVal)
      : compareVal <= currentVal;
  };

  setMaxVal(maxVal) {
    this.#MAX_VAL = maxVal;
  }

  /**
   * 设置比较函数
   * @param {(compareVal, currentVal) => boolean} compareFunc
   */
  setCompare(compareFunc) {
    this.#compare = compareFunc;
  }

  getMin() {
    return this.#data[1];
  }

  isEmpty() {
    return this.#size === 0;
  }

  /**
   * 向堆中插入一个合法值
   * @param {number} val
   */
  insert(val) {
    if (this.MAX_VAL <= val) {
      throw `can not insert val bigger than ${this.#MAX_VAL}`;
    }
    // 堆的容量扩充1
    this.#size++;
    // 让i指向当前新位置
    let i = this.#size;
    // 因为有哨兵的关系，不需要添加约束条件 i > 0
    // this.#data[Math.floor(i / 2)] > val
    while (this.#selfCompare(val, this.#data[Math.floor(i / 2)])) {
      this.#data[i] = this.#data[Math.floor(i / 2)];
      i = Math.floor(i / 2);
    }
    this.#data[i] = val;
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
    let maxVal = this.#data[1];
    let temp = this.#data[this.#size--];
    this.#data[1] = temp;
    // JavaScript语言需要进行这一步，让数组的规模缩小，释放空间
    this.#data.length--;
    this.percDown(1);
    return maxVal;
  }

  /**
   * 下滤：将堆中以堆data[p]为根的子堆调整为最小堆
   * @param {number} p 根节点索引
   */
  percDown(p) {
    let parent, child;
    let temp = this.#data[p]; /* 取出根结点存放的值 */
    for (parent = p; parent * 2 <= this.#size; parent = child) {
      child = parent * 2;
      // this.#data[child] >= this.#data[child + 1]
      if (
        child != this.#size &&
        this.#selfCompare(this.#data[child + 1], this.#data[child])
      ) {
        child++; /* child指向左右子结点的较大者 */
      }
      /* 找到了合适位置 */
      // temp <= this.#data[child]
      if (this.#selfCompare(temp, this.#data[child])) {
        break;
      } else {
        /* 下滤X */
        this.#data[parent] = this.#data[child];
      }
    }
    this.#data[parent] = temp;
  }

  /**
   * 构建最小堆
   */
  buildHeap() {
    /* 调整data中的元素，使满足最小堆的有序性  */
    /* 这里所有size个元素已经存在data[]中 */
    /* 从最后一个结点的父节点开始，到根结点1 */
    for (let i = Math.floor(this.#size / 2); i > 0; i--) {
      this.percDown(i);
    }
  }
}
