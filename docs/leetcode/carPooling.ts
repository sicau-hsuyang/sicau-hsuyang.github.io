export function carPooling(
  trips: Array<[number, number, number]>,
  capacity: number
): boolean {
  trips.sort((a, b) => a[1] - b[1]);
  //用来记住当前最近的下车的人和下车的时间点
  const listMap: Array<[number, number]> = [];
  // 当前车上装的人
  let currentPeopleSize = 0;
  for (let i = 0; i < trips.length; i++) {
    const ele = trips[i];
    const [size, fromMileStone, toMileSone] = ele;
    // 先把车上能撵下去的人全部撵下车
    let top = listMap[0];
    while (top && top[1] <= fromMileStone) {
      // 下多少个人
      currentPeopleSize -= top[0];
      listMap.shift();
      // 接着撵人下车
      top = listMap[0];
    }
    // 如果当前的车还装的下这么多人
    if (capacity - currentPeopleSize >= size) {
      // 上车
      currentPeopleSize += size;
      // 记住这个人在什么时候下车
      listMap.push([size, toMileSone]);
      // 把最近的
      listMap.sort((a, b) => {
        return a[1] - b[1];
      });
    } else {
      return false;
    }
  }
  return true;
}
