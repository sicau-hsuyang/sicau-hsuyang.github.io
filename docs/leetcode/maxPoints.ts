/**
 * 判断点是否在y=kx+b的直线上
 * @param k
 * @param b
 * @param point
 */
function isOnLine(k: number, b: number, point: number[]) {
  return point[0] * k + b === point[1];
}



/**
 * 两点确定一条直线
 * @param point1
 * @param point2
 */
function calcLine(point1: number[], point2: number[]) {
  // k = (y2-y1)/(x2-x1)
  let k = (point1[1] - point2[1]) / (point1[0] - point2[0]);
  // b = (y1*x2-x1*y2)/(x2-x1)
  let b =
    (point1[1] * point2[0] - point1[0] * point2[1]) / (point2[0] - point1[0]);
  return {
    k,
    b,
  };
}

export function maxPoints(points: number[][]): number {
  const map: Map<number, Map<number, string>> = new Map();
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {}
  }
}
