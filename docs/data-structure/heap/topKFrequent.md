## [前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements)

给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

> 输入: nums = [1,1,1,2,2,3], k = 2
> 输出: [1,2] <br/> <br/>
> 输入: nums = [1], k = 1
> 输出: [1]

- 1 <= nums.length <= 105
- k 的取值范围是 [1, 数组中不相同的元素的个数]
- 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的

注意：你所设计**算法的时间复杂度 必须 优于 `O(n*log n)`** ，其中 n 是数组大小。

### 思路分析

首先，题目要求出现频率，那么，我们自然会想到建立哈希表，来统计每个整数出现的次数，在这儿，至少会有个遍历，那么这儿的时间复杂度是 `O(n)`，空间复杂度 `O(n)`;

接下来就是比较关键的问题了，频率求出来了，我们要求 TOP K，有个问题就是最快的排序算法至少是`O(n*log n)`，所以通过排序求肯定是无法满足性能要求的。那么，在这种想有序，但是又不能排序的场景下，我们自然而然会想到`堆`，但是是采用最大堆还是最小堆呢，我们要取的是前面 K 个，堆的大小是比数组小的，那必须是最小堆，因为这样你才能知道当前元素是否应该入堆。

假设当前堆的内容还没有达到 K，随便加入内容，如果达到了，要判断一下当前堆顶的元素是比当前元素大还是小，如果比当前元素小，说明当前元素才应该进去，堆顶的元素应该丢弃，否则保持堆不动。

因为堆内的元素在最终输出的时候是能保证有序性的，所以说，我们就遍历这个记录次数的对象(最坏情况是每个元素都只出现一次)，因此外层循环是 `O(N)`，堆在插入的时候，建堆的操作是基于二分查找的，所以其时间复杂度是 `O(logK)`，因为最多 K 个元素，因此空间复杂度是`O(K)`，因为两个套在一起使用的，所以时间复杂度是 `O(N*logK)`。

最后再将堆里面的内容全部输出，这儿需要牵涉到堆的调整，已知**数组能够在线性的时间复杂度内调整成堆**，那么这儿的时间复杂度是`O(K)`;

总的时间复杂度就是`O(K)` + `O(N*logK)`，去掉小的`O(K)`，时间复杂度是`O(N*logK)`; 空间复杂度是: `O(K)`+`O(N)`，去掉小的`O(K)`，空间复杂度是`O(N)`。

### 算法实现

```JS
/*
 * 抽象堆
 */
class Heap {
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
    if(typeof this._compare !== 'function') {
      throw `cannot compare without a compare function`;
    }
    return this._compare(compareVal, currentVal);
  };

  /**
   * 设置比较函数
   * @param {(compareVal, currentVal) => boolean} compareFunc
   */
  setCompare(compareFunc) {
    this._compare = compareFunc;
  }

  /**
   * 获取堆顶的元素
   */
  getTop() {
    return this._data[0];
  }

  /**
   * 按断堆是否是空
   */
  isEmpty() {
    return this._data.length === 0;
  }

  /**
   * 向堆中插入一个合法值
   * @param {number} val
   */
  insert(val) {
    // 如果当前数组没有元素，直接插入即可
    if (this._data.length === 0) {
      this._data[0] = val;
    } else {
      // 让i指向当前新位置，因为没有哨兵的关系，最后一个元素是length - 1，所以新位置就是length
      let i = this.size;
      while (this._selfCompare(val, this._data[Math.floor(i / 2)]) && i > 0) {
        this._data[i] = this._data[Math.floor(i / 2)];
        i = Math.floor(i / 2);
      }
      // 在合适的位置插入新的值
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
        child++; /* child指向左右子结点的较大者 最大堆 较小者 最小堆 */
      }
      /* 找到了合适位置 */
      // 注意这儿一定要取得等号 temp <= this.#data[child] 最小堆 temp >= this.#data[child] 最大堆
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


/**
 * 求TOP K个高频元素
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = Object.create(null);
  // 建立出现频率的哈希表
  nums.forEach((num) => {
    if (typeof map[num] === "undefined") {
      map[num] = 1;
    } else {
      map[num]++;
    }
  });
  // 将哈希表转成出现频率数组
  let frequentNumbers = [];
  Object.entries(map).forEach(([prop, value]) => {
    frequentNumbers.push({
      prop: Number.parseInt(prop),
      value,
    });
  });
  let minHeap = new Heap();
  minHeap.setCompare((compareVal, currentVal) => {
    return currentVal.frequent - compareVal.frequent >=0;
  });
  // 遍历频率建立哈希
  frequentNumbers.forEach(({ prop, value: frequent }) => {
    if (minHeap.size < k) {
      minHeap.insert({
        prop,
        frequent,
      });
    } else {
      // 获取堆顶的最小值
      let { frequent: minFrequent } = minHeap.getTop();
      // 如果堆顶的小，说明当前元素才应该进堆，堆顶元素应该丢弃
      if (minFrequent < frequent) {
        minHeap.deleteMin();
        minHeap.insert({
          prop,
          frequent,
        });
      }
    }
  });
  // 依次输出堆顶元素
  let results = [];
  while (!minHeap.isEmpty()) {
    let { prop } = minHeap.deleteMin();
    results.push(prop);
  }
  return results;
};
```

#### 算法复杂度

时间复杂度：`O(N*logK)`;

空间复杂度：`O(N)`
