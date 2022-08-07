## 二分查找

### 概念

二分查找：对于`有序`的线性表，首先找到位于这个线性表中央的元素(即`mid`)，将查找区域分为左半区([0,mid-1])和右半区[mid+1, length-1]，如果`mid`元素比待查找元素大，则在左半区查找，否则在右边区查找，重复这个过程，直到待查找区域为空时，结束查找。

### 代码实现

```JavaScript
/**
 * 二分查找法
 * @param {Array<Number>} arr 需要查找的序列
 * @param {Number} target 需要查找的数据
 * @returns {Number} 查找成功返回数据所在的下标索引，查找失败，返回-1
 */
function binarySearch(arr, target) {
    if (!Array.isArray(arr) || arr.length == 0) {
        console.log('empty array')
        return -1;
    }
    // 初始化开始指针
    let low = 0;
    // 初始化结束指针
    let high = arr.length - 1
    // 初始化中间位置标记
    let mid = Math.floor((low + high) / 2)
    // 定义初始的位置
    let pos = -1;
    while (low <= high) {
        // 如果找到了，则不再进行查找，跳出循环
        if (arr[mid] === target) {
            pos = mid;
            break
        }
        // 如果当前值在中间值的左侧，说明从中间值往左的元素，都是不大于target的 缩小查找范围，因此从mid的前一位查找
        if (arr[mid] > target) {
            high = mid - 1
        }
        // 如果当前值在中间值的右侧，说明中间值往右的元素，都是不小于target的 缩小查找范围，因此从mid的后一位查找
        else if (arr[mid] < target) {
            low = mid + 1
        }
        // 重新划分中间值
        mid = Math.floor((low + high) / 2)
    }
    return pos
}
```

### 复杂度分析

二分查找是高效的查找算法，其时间复杂度为`O(logN)`。
