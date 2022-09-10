## 基数排序

桶排序有一定的使用局限，假设有`N=10`个整数，每个数值在`0`到`999`之间（`M`有`1000`个不同的值），如果还是按照桶排序的做法的话，将需要`1000`个桶，这是非常浪费性能的。通过观察可以发现，这些数的位数都是`0-9`，可以建立`10`个桶，然后用每位数字做关键字利用桶排序的思路对其进行排序。

### 排序过程(以`LSD`为例)

第一步：将待排序数据构建成链表

第二步：依次摘取出链表的节点，从这个节点的数据的右边取出的第一位数字作为`key`，根据`key`的值将数据插入到对应`key`的桶中

第三步：将桶中非空的链表重新构建成新的链表

第四步：重复第二步的过程，取节点的数据的倒数第二位的数字作为`key`，若数据长度不够，则视为`0`。

...

第`N`步：将桶中的非空链表导依次回至原数组中，完成排序。

<img src="//www.runoob.com/wp-content/uploads/2019/03/radixSort.gif" alt="基数排序" />

### 算法实现

最高位优先(`Most Significant Digit first`)法，简称 `MSD` 法：先按 `k[1]`（从左到右第一位） 排序分组，同一组中记录，关键码 `k[1]` 相等，再对各组按 `k[2]` 排序分成子组，之后，对后面的关键码继续这样的排序分组，直到按最次位关键码 `k[d]` 对各子组排序后。再将各组连接起来，便得到一个有序序列。

最低位优先(`Least Significant Digit first`)法，简称 `LSD` 法：先从 `k[d]`（从右到左第一位） 开始排序，再对 `k[d-1]` 进行排序，依次重复，直到对 `k[1]` 排序后便得到一个有序序列。

#### LSD 算法实现

```js
/**
 * 次位优先基数排序
 * @param {number[]} arr
 */
function LSDRadixSort(arr) {
  /* 假设元素最多有MaxDigit个关键字，基数全是同样的Radix */
  const MaxDigit = 3;
  const Radix = 10;

  /**
   * 获取第offset位数的数数字
   * @param {number} num
   * @param {number} offset
   * @returns
   */
  function getDigit(num, offset) {
    let d, i;
    for (i = 1; i <= offset; i++) {
      d = num % Radix;
      num = Number.parseInt(num / Radix);
    }
    return d;
  }

  /* 初始化每个桶为空链表 */
  let buckets = Array.from({
    length: Radix,
  }).map(() => {
    return {
      head: null,
      tail: null,
    };
  });
  let list = null;

  /* 将原始序列逆序存入初始链表List */
  for (let i = 0; i < arr.length; i++) {
    const node = {
      value: arr[i],
      next: list,
    };
    if (list === null) {
      list = node;
    } else {
      node.next = list;
      list = node;
    }
  }

  /* 下面开始排序 */
  /* 对数据的每一位循环处理 */
  for (let pass = 1; pass <= MaxDigit; pass++) {
    /* 下面是分配的过程 */
    let node = list;
    while (node) {
      /* 获得当前元素的当前位数字 */
      let Di = getDigit(node.value, pass);
      /* 将node从list中摘除 */
      let nextNode = node.next;
      node.next = null;
      /* 将node插入buckets[Di]号桶尾 */
      if (buckets[Di].head == null) {
        buckets[Di].head = buckets[Di].tail = node;
      } else {
        buckets[Di].tail.next = node;
        buckets[Di].tail = node;
      }
      node = nextNode;
    }
    /* 下面是收集的过程 */
    list = null;
    /* 将每个桶的元素顺序收集入list */
    for (let digit = Radix - 1; digit >= 0; digit--) {
      /* 如果桶不为空 */
      if (buckets[digit].head) {
        /* 整桶插入list表头 */
        buckets[digit].tail.next = list;
        list = buckets[digit].head;
        /* 清空桶 */
        buckets[digit].head = buckets[digit].tail = null;
      }
    }
  }
  /* 将list导回arr */
  let node = list;
  let offset = 0;
  while (node) {
    arr[offset++] = node.value;
    node = node.next;
  }
}
```

#### MSD 算法实现

```js
/**
 * 主位优先基数排序
 * @param {number[]} arr
 */
function MSDRadixSort(arr) {
  /* 假设元素最多有MaxDigit个关键字，基数全是同样的Radix */
  const MaxDigit = 3;
  const Radix = 10;

  function getDigit(num, offset) {
    /* 默认次位D=1, 主位D<=MaxDigit */
    let d, i;
    for (i = 1; i <= offset; i++) {
      d = num % Radix;
      num = Number.parseInt(num / Radix);
    }
    return d;
  }

  function MSD(arr, left, right, D) {
    /* 核心递归函数: 对arr[left]...arr[right]的第D位数进行排序 */
    /* 初始化每个桶为空链表 */
    let buckets = Array.from({
      length: Radix,
    }).map(() => {
      return {
        head: null,
        tail: null,
      };
    });
    let list = null;
    /* 递归终止条件 */
    if (D == 0) {
      return;
    }
    /* 将原始序列逆序存入初始链表List */
    for (let i = left; i <= right; i++) {
      const node = {
        val: arr[i],
        next: list,
      };
      if (list === null) {
        list = node;
      } else {
        node.next = list;
        list = node;
      }
    }
    /* 下面是分配的过程，以头插法分配 */
    let node = list;
    while (node) {
      /* 获得当前元素的当前位数字 */
      let Di = getDigit(node.val, D);
      /* 从list中摘除 */
      let nextNode = node.next;
      node.next = null;
      /* 插入buckets[Di]号桶 */
      if (buckets[Di].head == null) {
        buckets[Di].head = buckets[Di].tail = node;
      } else {
        node.next = buckets[Di].head;
        buckets[Di].head = node;
      }
      node = nextNode;
    }

    /* 下面是收集的过程 */
    /* i, j记录当前要处理的arr[]的左右端下标 */
    let i = left,
      j = i;
    for (let digit = 0; digit < Radix; digit++) {
      /* 对于每个桶 */
      if (buckets[digit].head) {
        /* 将非空的桶整桶倒入arr[], 递归排序 */
        let node = buckets[digit].head;
        while (node) {
          arr[j++] = node.val;
          node = node.next;
        }
        /* 递归对该桶数据排序, 位数减1 */
        MSD(arr, i, j - 1, D - 1);
        /* 为下一个桶对应的arr[]左端 */
        i = j;
      }
    }
  }

  MSD(arr, 0, arr.length - 1, MaxDigit);
}
```
