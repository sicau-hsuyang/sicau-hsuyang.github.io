class WaterBottle {
  /**
   * 水壶的最大容量
   */
  maxCapacity = 0;
  /**
   * 当前水壶中装的水
   */
  currentCapacity = 0;

  /**
   * 设置水壶的最大容量
   * @param maxCapacity
   */
  setMaxCapacity(maxCapacity: number) {
    this.maxCapacity = maxCapacity;
  }

  /**
   * 倒掉水壶里面的水
   */
  flushBottle() {
    const maxCapacity = this.currentCapacity;
    this.currentCapacity = 0;
    return maxCapacity;
  }

  /**
   * 倒掉一部分水
   */
  flushSomeWaterFromBottle(size: number) {
    this.currentCapacity -= size;
  }
}

function canMeasureWater(x: number, y: number, target: number): boolean {}

/*

*/
