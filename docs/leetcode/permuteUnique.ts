// function basicPermute(nums: number[]): number[][] {
//   if (nums.length === 0) {
//     return [];
//   } else if (nums.length === 1) {
//     return [[nums[0]]];
//   } else {
//     const res: number[][] = [];
//     const subRes = basicPermute(nums.slice(1));
//     subRes.forEach((arr) => {
//       res.push([...arr, nums[0]]);
//       for (let i = 0; i < arr.length; i++) {
//         const temp = arr[i];
//         arr[i] = nums[0];
//         res.push([...arr, temp]);
//         arr[i] = temp;
//       }
//     });
//     return res;
//   }
// }

// export function permuteUnique(nums: number[]): number[][] {
//   nums.sort((a, b) => {
//     return a - b;
//   });
//   return basicPermute(nums);
// }

function basicPermute(nums: number[]): number[][] {
  if (nums.length === 0) {
    return [];
  } else if (nums.length === 1) {
    return [[nums[0]]];
  } else {
    const res: number[][] = [];
    const subRes = basicPermute(nums.slice(1));
    subRes.forEach((arr) => {
      for (let i = 0; i <= arr.length; i++) {
        // 跳过重复情况
        if (i > 0 && nums[0] === arr[i - 1]) {
          continue;
        }
        const newArr = [...arr.slice(0, i), nums[0], ...arr.slice(i)];
        res.push(newArr);
      }
    });
    return res;
  }
}

export function permuteUnique(nums: number[]): number[][] {
  nums.sort((a, b) => {
    return a - b;
  });
  return basicPermute(nums);
}


/**

[]

[1] -> [1]
[1, 2] -> [1,2],[2,1]
[1, 2, 3] ->
            [1, 2, 3],
            [1, 3, 2],
            [3, 1, 2],
            [2, 1, 3],
            [3, 2, 1]
            [2, 3, 1]


[1, 1, 2]

[1] -> [1]
[1, 1] -> [1, 1]
[1, 1, 2] -> [2, 1, 1]
             [1, 2, 1]
             [1, 1, 2]

 */
