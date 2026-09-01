// export function threeSum(nums: number[]): number[][] {
//   const res: number[][] = [];
//   nums.sort((a, b) => a - b);
//   for (let i = 0; i < nums.length - 2; ) {
//     let start = i + 1;
//     let end = nums.length - 1;
//     let sum = nums[i] + nums[start] + nums[end];
//     while (start < end) {
//       let moveRight = false;
//       let moveLeft = false;
//       if (sum > 0) {
//         moveRight = true;
//       } else if (sum < 0) {
//         moveLeft = true;
//       } else {
//         res.push([nums[i], nums[start], nums[end]]);
//         moveLeft = true;
//         moveRight = true;
//       }
//       if (moveLeft) {
//         let offsetL = start + 1;
//         while (nums[offsetL] === nums[start] && offsetL < end) {
//           offsetL++;
//         }
//         start = offsetL;
//       }
//       if (moveRight) {
//         let offsetR = end - 1;
//         while (nums[offsetR] === nums[end] && offsetR > start) {
//           offsetR--;
//         }
//         end = offsetR;
//       }
//       sum = nums[i] + nums[start] + nums[end];
//     }
//     let offset = i + 1;
//     while (nums[offset] === nums[i] && offset < nums.length - 2) {
//       offset++;
//     }
//     i = offset;
//   }
//   return res;
// }

export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => {
    return a - b;
  });
  let res: number[][] = [];
  for (let i = 0; i < nums.length - 2; ) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[left] + nums[right] + nums[i];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        let offsetLeft = left + 1;
        while (nums[offsetLeft] === nums[left] && offsetLeft < right) {
          offsetLeft++;
        }
        left = offsetLeft;
        let offsetRight = right - 1;
        while (nums[offsetRight] === nums[left] && offsetRight > left) {
          offsetRight--;
        }
        right = offsetRight;
      } else if (sum > 0) {
        let offsetRight = right - 1;
        while (nums[offsetRight] === nums[right] && offsetRight > left) {
          offsetRight--;
        }
        right = offsetRight;
      } else if (sum < 0) {
        let offsetLeft = left + 1;
        while (nums[offsetLeft] === nums[left] && offsetLeft < right) {
          offsetLeft++;
        }
        left = offsetLeft;
      }
    }
    let offset = i + 1;
    while (nums[offset] === nums[i] && offset < nums.length - 2) {
      offset++;
    }
    i = offset;
  }
  return res;
}
