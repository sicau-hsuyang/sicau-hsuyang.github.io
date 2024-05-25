export function wateringPlants(plants: number[], capacity: number): number {
  let totalStep = 0;
  let currentCapacity = capacity;
  for (let i = 0; i < plants.length; ) {
    const current = plants[i];
    // 如果当前水桶里面的水够
    if (currentCapacity >= current) {
      totalStep++;
      currentCapacity -= current;
      i++
    } else {
      // 重新惯水
      currentCapacity = capacity;
      // 来回跑2次
      totalStep += i * 2;
    }
  }
  return totalStep;
}
