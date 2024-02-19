import { Entity, EntityCategory } from "./Entity";

/**
 * 七对的胡牌类型，保证传入的参数是已经进行过排序的，找到7对的听牌
 */
export function sevenPairHandCalc(group: Entity[][]) {
  // 暂未定缺，还不可以进行胡牌
  if (group.length === 3) {
    return -1;
  }
  // 将牌型进行合并
  const list = group.reduce((l, c) => {
    return l.concat(c);
  });
  // 如果牌的内容不为13，说明肯定是不是7对
  if (list.length !== 13) {
    return -1;
  }
  let targetVal = -1;
  let i = 0;
  while (i < list.length) {
    // 说明当前是一对牌，花色一样，内容一样，可以直接跳过到下一对进行比较
    if (
      list[i + 1] &&
      list[i].size === list[i + 1].size &&
      list[i].type === list[i + 1].type
    ) {
      i += 2;
    }
    // 说明当前这个牌是单的，如果是符合预期的牌型的话，那么，这个就是最终听的牌，否则说明不是听牌
    else if (
      list[i + 1] &&
      (list[i].size !== list[i + 1].size || list[i].type !== list[i + 1].type)
    ) {
      if (targetVal === -1) {
        targetVal = list[i].size;
        i++;
      } else {
        return -1;
      }
    }
    // 若最后一个牌才是单的，之前的都是双的，则最后一个也是可以胡的牌
    else if (!list[i + 1] && targetVal === -1) {
      return list[i].size;
    }
  }
  return targetVal;
}

/**
 * 普通胡牌的计算，保证传入的参数是已经进行过排序的
 */
export function normalHandCalc(group: Entity[][]) {
  // 尚未打缺，无法胡牌
  if (group.length === 3) {
    return [];
  }
  // 将不同的牌型进行合并
  const list = group.reduce((l, c) => {
    return l.concat(c);
  });
  // 相公，即手牌不足或者手牌多了，都无法胡牌
  if (list.length > 13 || list.length % 3 !== 1) {
    return [];
  }
  // 找出当前手牌能够可以胡的牌
  const selectTargetEntity: Entity[] = [];
  // 如果用户不是清一色，那么，用户可以胡牌的类型就是持有两种类型牌的其中之一
  const type1 = group[0][0].type;
  selectTargetEntity.push(...createTryTarget(type1));
  if (group.length === 2) {
    const type2 = group[1][0].type;
    selectTargetEntity.push(...createTryTarget(type2));
  }
  // 得到所有可以胡的牌的结果
  return selectTargetEntity.filter((v) => {
    return calcHand(list, v);
  });
}

function clone(obj: unknown) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 计算胡牌
 * @param group 当前手牌
 * @param target 是否可以胡这个牌
 */
function calcHand(list: Entity[], target: Entity) {
  // 将手牌进行克隆，因为要计算很多次，不能直接操作玩家的手牌
  const myList = clone(list) as Entity[];
  // 将候选听牌加入手牌
  myList.push(target);
  myList.sort((a, b) => {
    if (a.type != b.type) {
      return String(a.type).charCodeAt(0) - String(b.type).charCodeAt(0);
    } else {
      return a.size - b.size;
    }
  });
  // 从玩家的手牌里面选出一对，四川麻将称之为 将，然后剩余的牌，只要每3个能够组成AAA 或者ABC，ABC为等差数列，公差为1的组合，
  // 这个牌就是玩家可听的候选项。
  const map: Map<String, Entity[]> = new Map();
  myList.forEach((entity) => {
    // 以类型和内容作为Map的Key
    const key = entity.size + "" + entity.type;
    if (map.has(key)) {
      map.get(key)!.push(entity);
    } else {
      map.set(key, [entity]);
    }
  });
  // 过滤出大于2的牌，这些牌才有资格作为将对
  const pairOptions = [...map.values()].filter((v) => {
    return v.length >= 2;
  });
  // 计算出，去除将对之后的剩余的所有手牌的可能性
  const filterPairResultGroupList = pairOptions.map((v) => {
    // 仍然需要深克隆，因为需要多次处理
    const onceList = clone(myList) as Entity[];
    let counter = 0;
    while (counter < 2) {
      const idx = onceList.findIndex(
        (t) => t.size === v[0].size && t.type === v[0].type
      );
      if (idx >= 0) {
        onceList.splice(idx, 1);
        counter++;
      }
    }
    // 得到去除将对以后剩余的手牌
    return onceList;
  });
  // 只要有一个能满足条件，则认为可以胡
  return filterPairResultGroupList.some((list) => judge(list));
}

/**
 * 对手牌进行分组，然后再进行判断
 * @param list
 */
function judge(list: Entity[]) {
  const map: Map<String, Entity[]> = new Map();
  list.forEach((v) => {
    if (map.has(v.type)) {
      map.get(v.type)!.push(v);
    } else {
      map.set(v.type, [v]);
    }
  });
  const group = [...map.values()];
  // 分别对两组牌进行组合，如果都可以满足，则认为是可以胡牌的，玩家有可能只有一门花色的牌
  return calcOnce(group[0] || []) && calcOnce(group[1] || []);
}

/**
 * 计算出除了将对以外的牌，是否可以组成每3个能够组成AAA 或者 ABC，ABC为等差数列，公差为1的结果，只处理一种类型的牌型
 * @param list
 */
function calcOnce(list: Entity[]) {
  if (list.length === 0) {
    return true;
  }
  while (list.length >= 3) {
    let flag = true;
    // 如果当前牌能够组成AAA的组合
    if (
      list.length >= 3 &&
      list[0].size === list[1].size &&
      list[1].size === list[2].size
    ) {
      // 丢弃AAA，继续进行下一轮计算
      let counter = 3;
      while (counter > 0) {
        list.shift();
        counter--;
      }
      flag = false;
    } else {
      // 不能直接取前3进行比较，因为有可能出现122334这样的case，实际上可以组成123,234这样的组合
      let a = list[0].size;
      let b: number | null;
      let offsetB = 1;
      // 向后找到第一个比A大的数，B一定是可以找的到的
      while (offsetB < list.length && a === list[offsetB].size) {
        offsetB++;
      }
      if (offsetB >= list.length) {
        return false;
      }
      b = list[offsetB].size;
      let offsetC = offsetB + 1;
      // 向后找到第一个比C大的数，但是C不一定能够找到，比如113这样的场景，就只能找到AB，无法确定C
      while (offsetC < list.length && b === list[offsetC].size) {
        offsetC++;
      }
      let c: number | null = offsetC < list.length ? list[offsetC].size : null;
      // 如果ABC满足公差为1的等差数列，说明这三个牌也可以丢弃。
      if (typeof c === "number" && b - a === 1 && c - b === 1) {
        // 丢弃第一个牌
        list.shift();
        // 丢弃第二个牌，因为原来的牌少了一个，所以offset要减去1
        list.splice(offsetB - 1, 1);
        // 丢弃第三个牌，因为原来的牌少了两个个，所以offset要减去2
        list.splice(offsetC - 2, 1);
      } else {
        return false;
      }
      flag = false;
    }
    if (!flag) {
      list.sort((a, b) => {
        return a.size - b.size;
      });
    } else {
      // 说明无法组成AAA或者，ABC，公差为1的等差数列
      return false;
    }
  }
  // 如果不能消完，说明不能完全组成AAA，或者ABC这样的排列
  return list.length === 0;
}

/**
 * 根据牌型，生成可能听牌的候选项
 * @param type
 * @returns
 */
function createTryTarget(type: EntityCategory) {
  const selectTargetEntity: Entity[] = [];
  for (let i = 1; i <= 9; i++) {
    selectTargetEntity.push(
      new Entity({
        type,
        size: i,
      })
    );
  }
  return selectTargetEntity;
}

/**
 清一色

 杠上花

 杠上炮

 抢杠

 七对

 海底捞月

 自摸

 对子胡

 带根

 大单调

 带幺
 */

/**
  胡牌的类型（互斥）：
    七对
    大单调
    普通对子胡
    带幺
    可叠加：
      清一色
      手牌或者碰杠的牌每拥有4个 算一勾 

  其它因素（互斥）：
    杠上花
    抢杠
    杠上炮

  牌序因素：
    海底捞月

  特色规则：
    自摸加翻
  */

type WinBonus = "杠上花" | "杠上炮" | "抢杠" | "NULL";

/**
 * 胡牌收益计算规则
 */
class ProfitCalculator {
  /**
   * 自摸，根据各地的规则决定是否加翻
   */
  winBySelf() {
    return 1;
  }

  /**
   * 海底捞月胡，假设加一翻，可根据规则修改配置
   * @returns
   */
  winByLastEntity() {
    return 1;
  }

  /**
   * 胡牌的时候的加倍
   * @param type 胡牌的加倍类型
   * @param isWinBySelf 是否是自摸
   * @returns
   */
  getWinBonus(type: WinBonus, isWinBySelf: boolean, isLastEntity: boolean) {
    const lastExp = isLastEntity ? this.winByLastEntity() : 0;
    switch (type) {
      case "杠上炮":
      case "抢杠":
        return 1 + lastExp;
      case "杠上花":
        // 杠上花本来是2翻，如果实行自摸加翻，则杠上花是3翻
        return 2 + this.winBySelf() + lastExp;
      default:
        return lastExp + (isWinBySelf ? this.winBySelf() : 0);
    }
  }

  /**
   * 胡牌的类型
   * @param handGroup 手牌
   * @param assetGroup 碰杠的牌
   */
  getWinGameTypeExp(handGroup: Entity[][], assetGroup: Entity[][]) {
    // 七对
    if (this.isSevenPair(handGroup)) {
      return 2;
    }
    // 大单调
    else if (this.isBigSingleFishing(handGroup)) {
      return 2;
    }
    // 带幺
    else if (this.isDaiYao(handGroup, assetGroup)) {
      return 2;
    }
    // 普通对子胡
    else if (this.isStrictPair(handGroup)) {
      return 1;
    }
    // 平胡
    else {
      return 0;
    }
  }

  /**
   * 计算出玩家最终牌型的 勾 数
   * @param handGroup
   * @param assetGroup
   */
  getHasWholeEntityCounter(handGroup: Entity[][], assetGroup: Entity[][]) {
    const list = [...handGroup, ...assetGroup].reduce((total, arr) => {
      return total.concat(arr);
    });
    const map: Map<String, Entity[]> = new Map();
    list.forEach((entity) => {
      const key = entity.size + entity.type;
      if (map.has(key)) {
        map.get(key)!.push(entity);
      } else {
        map.set(key, [entity]);
      }
    });
    // 找出所有的拥有完全4张的牌
    return [...map.values()].filter((v) => v.length === 4).length;
  }

  /**
   * 计算
   * @param handGroup 手牌
   * @param assetGroup 资产牌，即碰或者杠下去之后的结果
   */
  calcProfit(
    handGroup: Entity[][],
    assetGroup: Entity[][],
    type: WinBonus,
    isWinBySelf: boolean,
    isLastEntity: boolean
  ) {
    // 胡牌类型的番数
    const normalExp = this.getWinGameTypeExp(handGroup, assetGroup);
    // 清一色的番数为2，可叠加
    const sameColorExp = this.isSameColor(handGroup, assetGroup) ? 2 : 0;
    // 拥有同4个一样的花色，同样的点数的组数，每组算一根，可叠加
    const wholeCounter = this.getHasWholeEntityCounter(handGroup, assetGroup);
    // 胡牌时候的奖励番数，可叠加
    const winBonus = this.getWinBonus(type, isWinBySelf, isLastEntity);
    const totalExp = normalExp + sameColorExp + wholeCounter + winBonus;
    return 2 ** totalExp;
  }

  /**
   * 是否是大单调
   * @param handGroup 玩家手牌
   */
  isBigSingleFishing(handGroup: Entity[][]) {
    // 大单调只剩最后一张牌，算上胡了的牌，总共只能是2张
    return handGroup.length === 1 && handGroup[0].length === 2;
  }

  /**
   * 是否是带幺
   */
  isDaiYao(handGroup: Entity[][], assetGroup: Entity[][]) {
    // TODO:
    return false;
  }

  /**
   * 判断一类花色的牌是否符合对子胡的牌型
   */
  _judge(list: Entity[]): boolean {
    if (list.length === 0) {
      return true;
    }
    // 排序
    list.sort((a, b) => {
      return a.size - b.size;
    });
    // 拷贝一下源数据，避免对其它计算结果造成影响
    list = JSON.parse(JSON.stringify(list)) as Entity[];
    // 是否已经消费了对子
    let costPair = false;
    while (list.length >= 2) {
      // 如果还没有消费过对子，此时还剩下两张牌，说明最后的2张牌可以成为对子胡的 将
      if (!costPair && list.length === 2 && list[0].size === list[1].size) {
        return true;
      }
      // 正常case，直接消费掉3个牌
      if (list[0].size === list[1].size && list[1].size === list[2].size) {
        let counter = 3;
        // 扔掉3个牌，继续下一轮判断
        while (counter > 0) {
          list.shift();
          counter--;
        }
      } else if (
        list[0].size === list[1].size &&
        !costPair &&
        list[1].size !== list[2].size
      ) {
        // 此时恰好出现AA BBB这样的场景
        costPair = true;
        // 扔掉前面两个，继续进行下一轮判断
        let counter = 2;
        while (counter > 0) {
          list.shift();
          counter--;
        }
      } else {
        return false;
      }
    }
    return true;
  }

  /**
   * 是否是对子胡
   * @param handGroup
   */
  isStrictPair(handGroup: Entity[][]) {
    return this._judge(handGroup[0]) || this._judge(handGroup[1] || []);
  }

  /**
   * 是否是清一色
   */
  isSameColor(handGroup: Entity[][], assetGroup: Entity[][]) {
    // 只有一组牌，并且碰或者杠下去的牌必须也是同样的
    return (
      handGroup.length === 1 &&
      assetGroup.length === 1 &&
      handGroup[0][0].type === assetGroup[0][0].type
    );
  }

  /**
   * 判断玩家的牌是否是七对
   * @param handGroup 玩家手牌
   * @returns
   */
  isSevenPair(handGroup: Entity[][]) {
    const list = handGroup.reduce((total, arr) => {
      return total.concat(arr);
    });
    if (list.length !== 14) {
      return false;
    }
    let val = 1;
    // 两个数字成对出现，做两次异或的效果等于没有做
    for (let i = 0; i < list.length; i++) {
      const temp =
        list[i].type === "万" ? 10000 : list[i].type === "筒" ? 1000 : 1;
      const num = list[i].size + temp;
      val ^= num;
    }
    // 如果最终的结果是1，说明玩家的手牌全部是成对出现的
    return val === 1;
  }
}
