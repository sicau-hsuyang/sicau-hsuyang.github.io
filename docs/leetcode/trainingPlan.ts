export function trainingPlan(actions: number[]): number[] {
  let left = 0;
  let right = actions.length - 1;
  while (true) {
    while (actions[left] % 2 !== 0 && left < right) {
      left++;
    }
    while (actions[right] % 2 === 0 && left < right) {
      right--;
    }
    if (left >= right) {
      break;
    }
    let tmp = actions[left];
    actions[left] = actions[right];
    actions[right] = tmp;
  }
  return actions;
}
