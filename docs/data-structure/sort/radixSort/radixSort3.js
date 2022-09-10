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

// const arr = [968, 61, 590, 168, 876, 161, 943, 869, 830, 510];

const arr = [
  968, 61, 590, 168, 876, 161, 943, 869, 830, 510, 500, 607, 676, 665, 323, 124,
  849, 270, 227, 906, 225, 261, 67, 397, 896, 357, 19, 63, 860, 157, 651, 344,
  961, 102, 308, 678, 675, 137, 805, 406, 839, 36, 995, 891, 607, 126, 773, 53,
  231, 111, 134, 807, 446, 650, 261, 802, 883, 63, 725, 805, 348, 702, 271, 290,
  911, 751, 595, 984, 522, 918, 114, 485, 388, 328, 590, 228, 252, 223, 35, 728,
  884, 484, 667, 9, 900, 734, 898, 583, 100, 127, 594, 590, 266, 98, 511, 156,
  550, 883, 512, 16,
];

LSDRadixSort(arr);
debugger;
