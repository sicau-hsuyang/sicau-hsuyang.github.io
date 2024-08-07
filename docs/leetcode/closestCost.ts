/**
 * 必选1份基料和至多2份配料，最接近成本的方案
 * @param baseCosts 基料列表
 * @param toppingCosts 配料列表
 * @param target 最终目标花费
 */
export function closestCost(
  baseCosts: number[],
  toppingCosts: number[],
  target: number
): number {
  let minDistance = Infinity;
  let targetPrice = 0;

  /**
   * 尝试选择基料
   * @param baseCosts
   * @param offset
   */
  function trySelectBase(
    baseCosts: number[],
    toppingCosts: number[],
    baseTarget: number,
    offset: number
  ) {
    // 没有基料可以选了
    if (offset >= baseCosts.length) {
      return 0;
    }
    // 如果运气好，选一个基料就可以，后续就不需要继续进行下去了
    if (baseCosts[offset] === baseTarget) {
      return baseTarget;
    }
    // 不选基料
    const plan1 = trySelectBase(
      baseCosts,
      toppingCosts,
      baseTarget,
      offset + 1
    );
    // 如果选择了基料以后就已经超出了目标值，那肯定不可能再选配料了，因为只会越选越大
    const tempCost = baseTarget - baseCosts[offset];
    const auxiliaryCost =
      tempCost > 0
        ? trySelectAuxiliary(toppingCosts, baseTarget - baseCosts[offset], 0)
        : 0;
    // console.log(auxiliaryCost);
    // 选择了基料，尝试开始选配料
    const plan2 = baseCosts[offset] + auxiliaryCost;
    const distance1 = Math.abs(plan1 - baseTarget);
    const distance2 = Math.abs(plan2 - baseTarget);
    // console.log(plan1, plan2);
    // 距离相同，选价格便宜的
    if (distance1 === distance2) {
      return Math.min(plan1, plan2);
    } else {
      return distance1 < distance2 ? plan1 : plan2;
    }
  }

  /**
   * 尝试选择配料，调用这个函数之前，一定是已经选择了基料的
   * @param toppingCosts
   * @param offset
   */
  function trySelectAuxiliary(
    toppingCosts: number[],
    auxTarget: number,
    offset: number
  ): number {
    // 没办法选配料了，或者配料表到头了
    if (offset === toppingCosts.length) {
      return 0;
    }
    // 如果选一个配料就可以满足目标，那就太好了
    if (toppingCosts[offset] === auxTarget) {
      return auxTarget;
    }
    const price1 = auxTarget - toppingCosts[offset];
    // 选择一份配料
    const plan1 =
      toppingCosts[offset] +
      (price1 > 0 ? trySelectAuxiliary(toppingCosts, price1, offset + 1) : 0);
    // 选择2份配料
    const price2 = auxTarget - 2 * toppingCosts[offset];
    // 选择2份配料
    const plan2 =
      2 * toppingCosts[offset] +
      (price2 > 0 ? trySelectAuxiliary(toppingCosts, price2, offset + 1) : 0);
    // 一份配料都不选
    const plan3 = trySelectAuxiliary(toppingCosts, auxTarget, offset + 1);
    const distance1 = Math.abs(plan1 - auxTarget);
    const distance2 = Math.abs(plan3 - auxTarget);
    const distance3 = Math.abs(plan2 - auxTarget);
    const arr = [
      {
        cost: plan1,
        distance: distance1,
      },
      {
        cost: plan2,
        distance: distance2,
      },
      {
        cost: plan3,
        distance: distance3,
      },
    ];
    arr.sort((a, b) => {
      return a.distance !== b.distance
        ? a.distance - b.distance
        : a.cost - b.cost;
    });
    return arr[0].cost;
  }

  trySelectBase(baseCosts, toppingCosts, target, 0);
}
