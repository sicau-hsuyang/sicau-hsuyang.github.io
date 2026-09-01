/**
 * 对有向无环图进行拓扑排序
 * @param map
 */
function topologicalSort(
  map: Map<
    number,
    {
      next: Set<number>;
      prev: Set<number>;
    }
  >
): boolean {
  const queue: number[] = [];
  map.forEach((refSet, course) => {
    // 当前节点的入度为0，则可以进行拓扑排序了
    if (refSet.prev.size === 0) {
      queue.push(course);
    }
  });
  let total = 0;
  while (queue.length) {
    const node = queue.shift()!;
    total++;
    const ref = map.get(node)!;
    ref!.next.forEach((nextNum) => {
      const nextRef = map.get(nextNum);
      // 删除下一个节点的入度
      nextRef!.prev.delete(node);
      // 如果下一个节点的入度为0，则它也可以进行拓扑排序了
      if (nextRef!.prev.size === 0) {
        queue.push(nextNum);
      }
    });
  }
  return total === map.size;
}

export function canFinish(
  numCourses: number,
  prerequisites: number[][]
): boolean {
  const map: Map<
    number,
    {
      next: Set<number>;
      prev: Set<number>;
    }
  > = new Map();
  for (let i = 0; i < numCourses; i++) {
    const refNode: {
      next: Set<number>;
      prev: Set<number>;
    } = {
      next: new Set(),
      prev: new Set(),
    };
    map.set(i, refNode);
  }
  for (let i = 0; i < prerequisites.length; i++) {
    const course = prerequisites[i];
    // 将当前
    const [now, before] = course;
    let nowRef = map.get(now)!;
    let beforeRef = map.get(before)!;
    // now的入度节点是before
    nowRef.prev.add(before);
    // now节点的出度节点
    beforeRef.next.add(now);
  }
  const flag = topologicalSort(map);
  return flag;
}
