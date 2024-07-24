// function cost(
//   costs: number[][],
//   offset: number,
//   map: Map<
//     number,
//     {
//       r: number;
//       g: number;
//       b: number;
//     }
//   > = new Map()
// ): {
//   r: number;
//   g: number;
//   b: number;
// } {
//   const cache = map.get(offset);
//   if (cache) {
//     return cache;
//   }
//   if (offset >= costs.length) {
//     return {
//       r: 0,
//       g: 0,
//       b: 0,
//     };
//   }
//   const nextCost = cost(costs, offset + 1);
//   const { r: nextR, g: nextG, b: nextB } = nextCost;
//   const results = {
//     r: costs[offset][0] + Math.min(nextG, nextB),
//     g: costs[offset][1] + Math.min(nextR, nextB),
//     b: costs[offset][2] + Math.min(nextR, nextG),
//   };
//   map.set(offset, results);
//   return results;
// }

// export function minCost(costs: number[][]): number {
//   const houseCost = cost(costs, 0, new Map());
//   return Math.min(houseCost.r, houseCost.b, houseCost.g);
// }

export function minCost(costs: number[][]) {
  let prev: {
    r: number;
    g: number;
    b: number;
  } = { r: costs[0][0], g: costs[0][1], b: costs[0][2] };

  for (let i = 1; i < costs.length; i++) {
    prev = {
      r: costs[i][0] + Math.min(prev.g, prev.b),
      g: costs[i][1] + Math.min(prev.r, prev.b),
      b: costs[i][2] + Math.min(prev.r, prev.g),
    };
  }

  return Math.min(prev.r, prev.g, prev.b);
}
