import { Entity, EntityCategory } from "./Entity";

/**
 * 麻将生成器，得到一副牌
 */
export class Generator {
  /**
   * 洗牌算法
   * @param arr
   */
  shuffle(arr: Array<Entity>) {
    for (let i = arr.length - 1; i >= 0; i--) {
      // 因为JS的随机数范围是[0, 1)，对其取floor之后，随机数范围则变成了[0, i - 1]， 所以为了保证，每个数都有机会被选取到，生成随机索引时，要传入i+1，
      // 使得生成的随机数索引范围在[0, i]之间
      const rndIdx = Math.floor(Math.random() * (i + 1));
      // 将随机选中的数交换到当前处理的位置上
      let tmp = arr[i];
      arr[i] = arr[rndIdx];
      arr[rndIdx] = tmp;
      // 完成交换之后，数据规模递减，直到完成所有的处理
    }
  }

  /**
   * 生成一副麻将
   */
  createMahjong() {
    const typeCategory: EntityCategory[] = ["筒", "条", "万"];
    // 得到一副牌
    const wholeMahjong = typeCategory
      .map((type) => {
        return this.createMahjongByType(type);
      })
      .reduce((total, item) => {
        return total.concat(item);
      });
    // 将生成的麻将乱序
    this.shuffle(wholeMahjong);
    return wholeMahjong;
  }

  /**
   * 生成
   */
  private createMahjongByType(type: EntityCategory) {
    const typeList: Entity[] = [];
    for (let i = 1; i <= 9; i++) {
      const entity = new Entity();
      // 设置麻将的花色
      entity.type = type;
      // 设置麻将的内容
      entity.size = i;
      typeList.push(entity);
    }
    return typeList;
  }
}
