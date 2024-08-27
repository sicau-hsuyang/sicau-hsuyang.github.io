/**
 *
 * @param {Array<any>} arr
 * @param {number} maxLevel
 */
function flatten(arr, maxLevel, currentLevel = 0) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && currentLevel <= maxLevel) {
      const tempRes = flatten(arr[i], maxLevel, currentLevel + 1);
      result.push(...tempRes);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
