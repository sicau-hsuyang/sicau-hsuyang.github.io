## 概念

数组（`Array`）是有序的元素序列。 若将有限个类型相同的变量的集合命名，那么这个名称为数组名。组成数组的各个变量称为数组的分量，也称为数组的元素，有时也称为下标变量。用于区分数组的各个元素的数字编号称为下标。

数组是在程序设计中，为了处理方便， 把具有相同类型的若干元素按有序的形式组织起来的一种形式。 这些有序排列的同类数据元素的集合称为数组。（以上内容 copy 自百度百科）

JS 数组和其它强类型（如`Java`，`C#`等）语言的数组有非常大的区别，**JS 的数组是可以自动增长的，而`Java`和`C#`的数组在初始化的时候就必须要申明其长度**。

因为这个差异，有些时候我们在讨论时间复杂度的时候就存在一定的差异，不过，我们通常还是以通用的数据结构定义为准进行讨论。

## 数组的遍历

时间复杂度为`O(n)`

```js
/**
 * 遍历数组
 * @param {number[]} arr
 */
function visitArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
```

## 数组的插入

首先，我们需要将插入的位置从数组中找到，这个操作的平均时间复杂度为`O(n)`，然后我们将数组的长度增加 1，并且把目标位置到数组最后一个位置的元素都依次向后错一位（给新插入的数据腾出空间呀），我们需要把后面的元素依次往前面挪动一位，这个操作的平均复杂度为`O(n)`，总的时间复杂度为`2*O(n)`,但是我们在讨论复杂度时，其描述的是算法的规模，因此我们需要省略这个系数，所以，数组删除的平均时间复杂度为`O(n)`。
平均时间复杂度`O(n)`

```js
/**
 * 像数组中插入一个值
 * @param {number[]} arr
 * @param {number} insertBefore 指定插入的位置在这个元素之后，如果找不到，则插在末尾
 * @param {number} val 待插入的值
 */
function insert(arr, insertBefore, val) {
  let targetIdx = -1;
  let length = arr.length;
  arr.length++;
  for (let i = 0; i < arr.length; i++) {
    if (arr[targetIdx] === insertBefore) {
      targetIdx = i;
      break;
    }
  }
  if (targetIdx === -1) {
    // 直接插在末尾
    arr[length] = val;
    // 这个地方不需要操作js的length，数组length自己会增加
    return;
  }
  // 必须是从后往前错一位
  for (let i = arr.length; i > targetIdx; i--) {
    // 将前面的元素拷贝给后面的元素
    arr[i] = arr[i - 1];
  }
  // 在留出的空位上插入新元素
  arr[targetIdx] = val;
}
```

## 数组的删除

首先，我们需要将待删除的元素从数组中找到，这个操作的平均时间复杂度为`O(n)`，然后我们将这个位置的元素从数组中拿掉，当前这个位置便空出来了，我们需要把后面的元素依次往前面挪动一位，这个操作的平均复杂度为`O(n)`，总的时间复杂度为`2*O(n)`,但是我们在讨论复杂度时，其描述的是算法的规模，因此我们需要省略这个系数，所以，数组删除的平均时间复杂度为`O(n)`。

```js
/**
 * 从数组中删除指定的元素
 * @param {number[] } arr 数据源
 * @param {number} target 待删除的值
 */
function remove(arr, target) {
  let targetIdx = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[targetIdx] === target) {
      targetIdx = i;
      break;
    }
  }
  if (targetIdx === -1) {
    console.warn("the target element can not exist in arr");
    return;
  }
  // 依次将后面的元素向前拷贝
  for (let i = targetIdx; i < arr.length; i++) {
    arr[targetIdx] = arr[targetIdx + 1];
  }
  // 数组的长度-1
  arr.length--;
}
```

## 数组的扩容

本节只为阐述原理，实际开发中并不需要这个步骤，这个操作的时间复杂度为`O(N)`

```JS
/**
 * 将数组扩容
 * @param {number[]} arr
 */
function expandArray(arr) {
  const len = arr.length
  // 糟粕语法，实际开发中不要使用, 假设扩容两倍
  const newArr = new Array(2 * len);
  for(let i = 0;i<newArr.length;i++) {
    // 将旧的数组的元素拷贝置新的数组上去，同时给新申请的空间初始化0，直接使用length初始化，数组在使用forEach等方法遍历时会跳过空元素
    const ele = i < arr.length ? arr[i] : 0;
    newArr[i] = ele;
  }
  return newArr;
}
```

## 数组的应用

略
