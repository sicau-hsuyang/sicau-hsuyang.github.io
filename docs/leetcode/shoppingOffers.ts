function calcCost(
  price: number[],
  special: number[][],
  needs: number[],
  offset = 0
): number {
  // 如果所有的物品都已经买好了，那就可以不用花钱了
  if (needs.every((v) => v === 0)) {
    return 0;
  }
  // 不买大礼包
  let originalCost = 0;
  // 先计算每个单买需要花费的钱
  for (let i = 0; i < needs.length; i++) {
    originalCost += price[i] * needs[i];
  }
  const pkg = special[offset];
  let canBuyPkg = true;
  // 遍历每个礼包里面的物品，看看
  for (let k = 0; k < pkg.length - 1; k++) {
    if (pkg[k] > needs[k]) {
      canBuyPkg = false;
      break;
    }
  }
  if (!canBuyPkg) {
    return originalCost;
  }
  for (let k = 0; k < pkg.length - 1; k++) {
    needs[k] -= pkg[k];
  }
  const pkgPrice = pkg[pkg.length - 1];
  let buyPkgCost = pkgPrice + calcCost(price, special, needs, offset + 1);
  let buyOtherPkgCost = calcCost(price, special, needs, offset + 1);
  return Math.min(originalCost, buyPkgCost, buyOtherPkgCost);
}

/**

 应当尽可能的买礼包，然后剩下的 再去买单件

 */

/**
 * 求购买合适的物品列表的最小花费
 * @param price 物品的价格列表
 * @param special 组合起来的物品价格列表，最后一个为礼包的价格
 * @param needs 总共需要的物品
 */
export function shoppingOffers(
  price: number[],
  special: number[][],
  needs: number[]
): number {
  return calcCost(price, special, needs, 0);
}
