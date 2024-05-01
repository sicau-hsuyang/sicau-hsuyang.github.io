export function maximumGap(nums: number[]): number {
  // 数组的元素小于2个
  if (nums.length < 2) {
    return 0;
  }
  const maxLength = 10 ** 5;
  // 使用10万个桶来存这些数据，每个桶之间的的元素最小是相差了10**5的,[0, 99999]，[100000, 199999]
  const arr: Array<number[] | null> = [];
  arr.length = maxLength;
  let maxDistance = 0;
  // 非空桶的索引
  let notEmptyBucketIdx: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const el = nums[i];
    const idx = Math.floor(nums[i] / maxLength);
    let bucket = arr[idx];
    if (!Array.isArray(bucket)) {
      bucket = [];
      arr[idx] = bucket;
      notEmptyBucketIdx.push(idx);
    }
    bucket.push(el);
  }
  // 如果只有一个桶有元素
  if (notEmptyBucketIdx.length === 1) {
    // 求出一个桶里面两个元素之间的最大距离
    const bucket = arr[notEmptyBucketIdx[0]]!;
    const D = findMaxInBucket(bucket);
    maxDistance = D;
  } else {
    // 如果有多个桶有元素
    let left = 0;
    while (!Array.isArray(arr[left])) {
      left++;
    }
    let right = left + 1;
    while (right <= arr.length) {
      if (Array.isArray(arr[right])) {
        // 上一个桶的最大值
        const maxEl = Math.max(...(arr[left] as number[]));
        // 这一个桶的最小值
        const minEl = Math.min(...(arr[right] as number[]));
        const D = Math.abs(minEl - maxEl);
        if (D >= maxDistance) {
          maxDistance = D;
        }
        left = right;
      }
      right++;
    }
    // 如果两个桶间隔有元素，说明最小的间距都是10**5，如果没有的话，就是说明全是密密麻麻的桶，因此需要对每个桶的最值进行比较
    if (maxDistance < 10 ** 5) {
      notEmptyBucketIdx.forEach((idx) => {
        const D = findMaxInBucket(arr[idx] as number[]);
        if (D > maxDistance) {
          maxDistance = D;
        }
      });
    }
  }
  return maxDistance;
}

function findMaxInBucket(bucket: number[]) {
  // console.log(bucket);
  if (bucket.length <= 1) {
    return -Infinity;
  }
  let maxDistance = 0;
  const max = Math.max(...bucket);
  const tempArr: number[] = [];
  tempArr.length = max % 10 ** 5;
  bucket.forEach((el) => {
    tempArr[el % 10 ** 5] = 1;
  });
  let left = 0;
  while (tempArr[left] !== 1) {
    left++;
  }
  let right = left + 1;
  while (right <= tempArr.length) {
    if (tempArr[right] === 1) {
      const D = right - left;
      if (D >= maxDistance) {
        maxDistance = D;
      }
      left = right;
    }
    right++;
  }
  return maxDistance;
}
