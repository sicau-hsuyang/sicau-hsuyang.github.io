/**
 * 以BFS的形式找迷宫的出口
 * @param {number[]} matrix
 */
function findPath(matrix) {
  const height = matrix.length;
  const width = matrix[0].length;
  /* 定义一个哈希表，用于记住经过的路径 */
  const pathMap = new Map();
  // 定义一个队列
  const queue = [];
  // 定义一个标记数组
  const maker = Array.from({
    length: height,
  }).map(() => {
    return Array.from({
      length: width,
    }).fill(0);
  });
  // 先将开始节点加入到队列中去
  queue.push({
    node: { x: 0, y: 0 },
    parent: null,
  });
  // 将起始节点标记为已处理
  maker[0][0] = true;
  let distNode = null;
  while (queue.length) {
    const { node, parent } = queue.shift();
    pathMap.set(node, parent);
    const { x, y } = node;
    if (x === width - 1 && y === height - 1) {
      distNode = node;
      break;
    }
    // 上边的点，存在且没有被访问过，并且不是障碍物
    const topPoint =
      isExist(matrix, x, y - 1) && !maker[y - 1][x] && matrix[y - 1][x] !== 1
        ? { x, y: y - 1 }
        : null;
    if (topPoint) {
      queue.push({
        node: topPoint,
        parent: node,
      });
      maker[y - 1][x] = true;
    }
    // 右边的点，存在且没有被访问过，并且不是障碍物
    const rightPoint =
      isExist(matrix, x + 1, y) && !maker[y][x + 1] && matrix[y][x + 1] !== 1
        ? { x: x + 1, y }
        : null;
    if (rightPoint) {
      queue.push({
        node: rightPoint,
        parent: node,
      });
      maker[y][x + 1] = true;
    }
    // 下边的点，存在且没有被访问过，并且不是障碍物
    const bottomPoint =
      isExist(matrix, x, y + 1) && !maker[y + 1][x] && matrix[y + 1][x] !== 1
        ? { x, y: y + 1 }
        : null;
    if (bottomPoint) {
      queue.push({
        node: bottomPoint,
        parent: node,
      });
      maker[y + 1][x] = true;
    }
    // 左边的点 存在且没有被访问过，并且不是障碍物
    const leftPoint =
      isExist(matrix, x - 1, y) && !maker[y][x - 1] && matrix[y][x - 1] !== 1
        ? { x: x - 1, y }
        : null;
    if (leftPoint) {
      queue.push({
        node: leftPoint,
        parent: node,
      });
      maker[y][x - 1] = true;
    }
  }
  const path = [distNode];
  let parent = pathMap.get(distNode);
  while (parent) {
    path.unshift(parent);
    distNode = parent;
    parent = pathMap.get(distNode);
  }
  return path.map((node) => {
    return [node.x, node.y];
  });
}

/**
 * 判断当前元素是否存在于迷宫中
 * @param {number[][]} matrix
 * @param {number} x
 * @param {number} y
 */
function isExist(matrix, x, y) {
  return Array.isArray(matrix[y]) && typeof matrix[y][x] !== "undefined";
}

const matrix = [
  [0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0],
];

const res = findPath(matrix);

console.log(res);
