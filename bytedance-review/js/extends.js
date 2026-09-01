function Super() {}

function Sub() {}

function inherit(Super, Base) {
  Super.call(Base);
  Base.prototype.__proto__ = Super.prototype;
  // 修正自己的constructor
  Base.prototype.constructor = Base;
  // 保证 静态属性能够继承
  Base.__proto__ = Super;
  /**
   * 
   */
}
