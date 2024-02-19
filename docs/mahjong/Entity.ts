export type EntityCategory = "筒" | "条" | "万";

/**
 * 麻将类
 */
export class Entity {
  /**
   * 牌的类型，筒条万
   */
  type: EntityCategory;
  /**
   * 牌的内容，
   */
  size: number;

  constructor({ type, size }: { size?: number; type?: EntityCategory } = {}) {
    size && (this.size = size);
    type && (this.type = type);
  }
}
