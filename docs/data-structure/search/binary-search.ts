/**
 * Binary search algorithm
 * @param arr Array of numbers to search
 * @param target The target number to find
 * @returns The index of the target if found, or -1 if not found
 */
export function binarySearch(arr: number[], target: number): number {
  if (!Array.isArray(arr) || arr.length === 0) {
    console.log("empty array");
    return -1;
  }

  // Initialize start and end pointers
  let low = 0;
  let high = arr.length - 1;

  // Initialize midpoint
  let mid = Math.floor((low + high) / 2);

  // Initialize position variable
  let pos = -1;

  while (low <= high) {
    // If target is found, set position and break out of loop
    if (arr[mid] === target) {
      pos = mid;
      break;
    }

    // If current value is on left side of midpoint, search left half
    if (arr[mid] > target) {
      high = mid - 1;
    }

    // If current value is on right side of midpoint, search right half
    else if (arr[mid] < target) {
      low = mid + 1;
    }

    // Recalculate midpoint
    mid = Math.floor((low + high) / 2);
  }

  return pos;
}
