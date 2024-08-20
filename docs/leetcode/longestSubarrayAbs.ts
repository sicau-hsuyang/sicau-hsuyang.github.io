// interface Struct {
//   value: number;
//   index: number;
// }

// function useMonoQueue(increase: boolean) {
//   const queue: Struct[] = [];

//   function compare(val1: number, val2: number) {
//     return increase ? val1 >= val2 : val2 >= val1;
//   }

//   function enqueue({ value, index }: Struct) {
//     while (queue.length && compare(queue[queue.length - 1].value, value)) {
//       queue.pop();
//     }
//     queue.push({ value, index });
//   }

//   function dequeue(offset: number) {
//     // Ensuring we only remove elements that are no longer in the current window
//     while (queue.length && queue[0].index < offset) {
//       queue.shift();
//     }
//   }

//   function getPrimary(): number {
//     return queue.length > 0 ? queue[0].value : 0;
//   }

//   return { enqueue, dequeue, getPrimary };
// }

// export function longestSubarray(nums: number[], limit: number): number {
//   if (nums.length === 0) return 0; // Handling edge case for empty array

//   let left = 0;
//   const minQueue = useMonoQueue(true);
//   const maxQueue = useMonoQueue(false);
//   let maxDistance = 1;

//   // Initialize the queues with the first element
//   minQueue.enqueue({ value: nums[0], index: 0 });
//   maxQueue.enqueue({ value: nums[0], index: 0 });

//   for (let right = 1; right < nums.length; right++) {
//     minQueue.enqueue({ value: nums[right], index: right });
//     maxQueue.enqueue({ value: nums[right], index: right });

//     while (maxQueue.getPrimary() - minQueue.getPrimary() > limit) {
//       left++;
//       minQueue.dequeue(left);
//       maxQueue.dequeue(left);
//     }

//     // Calculating the distance after confirming the window is valid
//     const currentDistance = right - left + 1;
//     if (currentDistance > maxDistance) {
//       maxDistance = currentDistance;
//     }
//   }

//   return maxDistance;
// }

function longestSubarray(nums: number[], limit: number) {
  const queMax: number[] = [];
  const queMin: number[] = [];
  const n = nums.length;
  let left = 0;
  let maxDistance = 0;
  for (let right = 0; right < n; right++) {
    while (queMax.length && nums[right] > queMax[queMax.length - 1]) {
      queMax.pop();
    }
    while (queMin.length && nums[right] < queMin[queMin.length - 1]) {
      queMin.pop();
    }
    queMax.push(nums[right]);
    queMin.push(nums[right]);
    while (queMax.length && queMin.length && queMax[0] - queMin[0] > limit) {
      if (queMax[0] === nums[left]) {
        queMax.shift();
      }
      if (queMin[0] === nums[left]) {
        queMin.shift();
      }
      left++;
    }
    maxDistance = Math.max(maxDistance, right - left + 1);
  }
  return maxDistance;
}
