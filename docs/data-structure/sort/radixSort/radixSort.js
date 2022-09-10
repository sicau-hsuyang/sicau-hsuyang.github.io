function radixSort(arr) {
  let buckets = [];
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    const digit = getDigit(num, 0);
    const node = {
      val: num,
      next: null,
    };
    if (!buckets[digit]) {
      buckets[digit] = node;
    } else {
      node.next = buckets[digit];
      buckets[digit] = node;
    }
  }
  /* 当前的第几轮 */
  let pass = 1;
  while (pass < 3) {
    for (let i = 0; i < buckets.length; i++) {
      let node = buckets[i];
      let newHead = null;
      while (node) {
        const num = node.val;
        const digit = getDigit(num, pass);
        const newNode = {
          val: num,
          next: null,
        };
        // 如果当前数就是要放在当前桶里面
        if (digit == i) {
          if (newHead === null) {
            newHead = newNode;
          } else {
            newNode.next = newHead;
            newHead = newNode;
          }
        } else {
          /* 否则，当前数是要放在其它桶里面 */
          newNode.next = buckets[digit];
          buckets[digit] = newNode;
        }
        node = node.next;
      }
      buckets[i] = newHead;
    }
    pass++;
  }
  let offset = arr.length - 1;
  for (let i = buckets.length; i >= 0; i--) {
    let node = buckets[i];
    while (node) {
      arr[offset--] = node.val;
      node = node.next;
    }
  }
  debugger;
}

/**
 * 获取从右到左的数字
 * @param {number} num
 * @param {number} offset 第offset轮
 */
function getDigit(num, offset = 0) {
  const str = String(num);
  let i = str.length - 1;
  let digit = str[i];
  while (offset > 0 && i >= 0) {
    i--;
    offset--;
    digit = str[i];
  }
  return typeof digit === "undefined" ? "0" : digit;
}

// const res = getDigit("1234", 5);
// console.log(res);

const nums = Array.from({
  length: 100,
}).map(() => Math.floor(Math.random() * 1001));

// const nums = [64, 8, 216, 512, 27, 729, 0, 343, 125, 1];

const res = radixSort(nums);
