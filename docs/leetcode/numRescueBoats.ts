export function numRescueBoats(people: number[], limit: number): number {
  people.sort((a, b) => {
    return a - b;
  });
  let total = 0;
  let left = 0;
  let right = people.length - 1;
  while (left <= right) {
    const leftWeight = people[left];
    const rightWeight = people[right];
    const sum = left === right ? leftWeight : leftWeight + rightWeight;
    // 一艘船装两个人
    if (sum <= limit) {
      left++;
      right--;
    }
    // 一艘船装不下两个人，装最胖的那个人
    else {
      right--;
    }
    total++;
  }
  return total;
}
