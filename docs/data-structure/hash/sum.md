## [两数之和](https://leetcode.cn/problems/two-sum/)

给定一个整数数组 `nums`  和一个整数目标值 `target`，请你在该数组中找出**和为目标值** `target` 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

这应该是绝大部分人人生中的第一道 LeetCode 题吧

### 朴素法

朴素法的思路和选择排序的思路差不多，反正只要我找到了两个能够满足题目要求的组合就可以了，所以，算法的实现如下：

```js
var twoSum = function (nums, target) {
  if (nums.length < 2) {
    return;
  }
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};
```

可以看到，朴素法的时间复杂度是`O(n²)`，因为没有用到额外的空间，所以空间复杂度为`O(1)`。

### 哈希法

这题能够使用哈希表进行解答的人一定是动过脑筋的人。

首先遍历是肯定少不了的，在遍历的时候，我们既然知道当前的数字，也知道总和，那我们我们可以算出差值，如果这个差值在数组中存在，那么就可以得到结果，如果不存在，继续尝试。

怎么样快速的检索一个东西是否存在，根据我们之前学过的理论，哈希表能够在`O(1)`的时间内检索，平衡二叉树和二分查找能够在`O(log n)`的时间内检索，二分查找肯定是搞不定的，二分查找必须要在有序的条件下才能使用，如果用平衡二叉树，我们还要根据其值的大小建立树，不仅非常麻烦，复杂度还不如哈希表，显然这题，用哈希表才比较符合场景。

```js
var twoSum = function (nums, target) {
  if (nums.length < 2) {
    return;
  }
  // 根据值建立哈希映射
  const map = Object.create(null);
  nums.forEach((num, idx) => {
    map[num] = idx;
  });
  for (let i = 0; i < nums.length; i++) {
    let a = nums[i];
    let b = target - a;
    let otherIdx = map[b];
    // 存在并且不是自己，自己跟自己肯定不行
    if (typeof otherIdx !== "undefined" && otherIdx !== i) {
      return [i, otherIdx];
    }
  }
};
```

建立哈希的时间复杂度是`O(N)`，空间复杂度是`O(N)`；

循环查找的时间复杂度是`O(N)`；

最终得时间复杂度是 2\*`O(N)`，省略系数，得`O(N)`，空间复杂度是`O(N)`。
