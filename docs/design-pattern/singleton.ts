export class Singleton {
  /**
   * 内部持有全局唯一的实例
   */
  private static instance: Singleton | null = null;
  /**
   * 私有化构造函数
   */
  private constructor() {}
  /**
   * 暴露访问其实例的访问方法
   * @returns
   */
  public static getInstance(): Singleton {
    return this.instance || (this.instance = new Singleton());
  }
}
