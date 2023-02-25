## 数组去重

数组去重作为前端入门级的面试题，可以说出现的频率实在是太高了。我在`17`年刚毕业的那会儿面试新华三，就被问到了这道题，尴尬的是我竟然没有写出来。

最少有`3`种实现方式。

### 1、两重`for`循环

这个可以说是通解了，属于没有什么技术含量的解法了。其思路就是首先第一重循环作用于数组本身，然后遇到新来的一个元素，再结果集里面再施加一重循环，查找是否在结果集中存在，若存在就跳过，否则就将其添加到结果集中。

```js
function removeDuplicate(arr) {
  const dataSets = [];
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    // 在结果集中查找是否存在
    if (dataSets.every((v) => v !== num)) {
      dataSets.push(num);
    }
  }
  return dataSets;
}
```

如果你面试初级前端的岗位的话，能写出上述代码，可以证明你已经具备编写常见的业务代码的能力了，但是如果是中高级岗位只能写出上述代码，你就得深刻的进行反思了，上述代码的算法复杂度`O(N²)`。

### 2、使用`ES6`的`Set`

这个实现就比较简单了，因为`ES6`的`Set`是一个特殊的`Map`，它是一个`key-value`相同的`Map`，也就是，一旦遇到重复的值，后面的把前面的覆盖掉，也就可以实现去重的效果了。

```js
function removeDuplicate(arr) {
  return [...new Set(arr)];
}
```

这种实现方法一般，能说明你能熟练的使用`ES6`的`API`了。

### 3、双指针

有序数组的去重关键就是怎么样利用起来有序的这个条件。

如果数据结构这门课学的比较好的同学一定知道`合并两个有序数组`这个题，这是`归并排序`的基础。那么有序数组的去重的与它的区别就仅仅体现在如果在合并的过程中，遇到两个数组元素相等的时候，只添加一个元素到结果集就好。

```js
/**
 * 有序数组去重
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
function removeDuplicate(arr1, arr2) {
  let offset1 = 0;
  let offset2 = 0;
  const result = [];
  //如果有一个数组已经合并完成了的话，循环退出
  while (offset1 < arr1.length && offset2 < arr2.length) {
    // 分别从两个数组中取出
    let v1 = arr1[offset1];
    let v2 = arr2[offset2];
    //值相等的时候合并一个就好
    if (v1 === v2) {
      result.push(v1);
      offset1++;
      offset2++;
    } else if (v1 < v2) {
      // 合并小的值
      result.push(v1);
      offset1++;
    } else if (v2 < v1) {
      // 合并小的值
      result.push(v2);
      offset2++;
    }
  }
  // 在上述循环退出来以后，有3种情况，有可能两个数组都合并完了，有可能数组1还没有合并完，也有可能数组2还没有合并完，也就是说以下两个while循环不可能同时成立，至多执行1个
  while (offset1 < arr1.length) {
    result.push(arr1[offset1++]);
  }
  while (offset2 < arr2.length) {
    result.push(arr2[offset2++]);
  }
  return result;
}
```

这样处理之后，不仅完成了数组去重，而且仍然能够保证结果集有序。

如果算上之前对数组进行排序的时间复杂度的话，排序算法最优的平均复杂度为`O(N*logN)`，合并数组的过程时间复杂度为`O(N)`，取最多的复杂度，所以，这种办法的时间复杂度是`O(N*logN)`(无论什么办法，最终得到的新数组总需要花费空间存储，所以这个空间复杂度肯定是不能讨论的)

### 4、哈希表

对于任意数组的合并，采用`哈希表`是一个比较优秀的解法，如果在面试过程中你能写出这种去重的办法面试官肯定会非常欣赏你的。

思路非常简单，首先，我们先对一个数组建立哈希表，然后遍历另外一个数组，每次遍历的时候，插入哈希表，因为哈希表就算新来的值把之前的覆盖也无所谓，最终我们需要的是哈希表的记录的key

```js
/**
 * 数组去重
 * @param {number[]} arr1
 * @param {number[]} arr2
 */
function removeDuplicate(arr1, arr2) {
  const map = new Map();
  // 将没有在哈希表中出现过的元素加入到哈希表中
  for (let i = 0; i < arr1.length; i++) {
    const num = arr1[i];
    map.set(num, 1);
  }
  // 遍历另外一个数组，如果哈希表中还没有，加入，否则跳过
  for (let i = 0; i < arr2.length; i++) {
    const num = arr2[i];
    map.set(num, 1);
  }
  //以哈希表的键的集合作为结果集，就是不重复的元素，map.keys()得到的是一个Iterator，使用扩展运算符可以将其变成一个真的数组
  return [...map.keys()];
}
```

这个实现用哪个数组建哈希表无所谓，因为哈希表最终建立的记录数总是趋近于两个数组的总长度的。

建立哈希表需要一个循环`O(N)`，遍历数组需要一个循环`O(N)`，遍历哈希的记录数需要一个循环`O(N)`，去掉系数`3`，上述操作的时间复杂度是`O(N)`，哈希表记录的内容趋近于两者的总和，因此空间复杂度`O(N)`

其实`方法2`的底层实现就是最后的这个实现，因为我们在`Set`是一个`key-value`相同的`Map`，后来的元素即便将之前的元素覆盖掉，但是最终`Map`的记录还是只记录了一条的，所以最终得到的结果就是两个数组无重复的并集啦。
