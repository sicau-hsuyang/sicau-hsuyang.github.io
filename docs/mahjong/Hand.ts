import { Entity } from "./Entity";

/**
 * 手牌
 */
export class Hand {
  typeList: Array<Entity[]>;

  /**
   * 整理手牌，排序
   */
  makeEntityTidy() {
    this.typeList.forEach((list) => {
      list.sort((a, b) => {
        return a.size - b.size;
      });
    });
  }
}
