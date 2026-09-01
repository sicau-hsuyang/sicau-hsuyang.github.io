function _quickSelect(nums, k, left, right) {
  if (left >= right) {
    return nums[left];
  }
  let i = left;
  let j = right;
  let pivot = nums[left];
  while (i < j) {
    // 把比主元大的拿到前面去
    while (i < j && nums[j] < pivot) {
      j--;
    }
    if (i < j) {
      nums[i] = nums[j];
      i++;
    }
    // 把比主元小的拿到后面去
    while (i < j && nums[i] > pivot) {
      i++;
    }
    if (i < j) {
      nums[j] = nums[i];
      j--;
    }
  }
  // // 主元就是要找的位置
  nums[i] = pivot;
  _quickSelect(nums, left, i-1)
  _quickSelect(nums, i+1, right)
  if (k === i) {
    return nums[i];
  } else if (k > i) {
    return _quickSelect(nums, k, i + 1, right);
  } else {
    return _quickSelect(nums, k, left, i - 1);
  }
}

function quickSelect(nums, k) {
  return _quickSelect(nums, k - 1, 0, nums.length - 1);
}

const arr = [1, 2, 4, 5, 3, 9, 6, 7, 8, 10];

const res = quickSelect(arr, 3);

console.log(res);
