class EventEmitter {
  _map = new Map();

  /**
   * 触发一个事件
   * @param {String} channel 触发的事件管道
   * @param  {...any} args 参数列表
   */
  $emit(channel, ...args) {
    const eventSets = this._map.get(channel);
    if (!Array.isArray(eventSets)) {
      return;
    }
    eventSets.forEach((f) => {
      f.apply(this, args);
    });
  }

  /**
   * 单次监听事件
   * @param {String} channel 监听事件的频道
   * @param {Function} handler 监听事件的处理器
   */
  $once(channel, handler) {
    this.$on(channel, handler, true);
  }

  /**
   * 监听事件
   * @param {String} channel 监听事件的频道
   * @param {Function} handler 监听事件的处理器
   * @param {boolean} once 是否仅监听一次
   */
  $on(channel, handler, once) {
    let eventSets = this._map.get(channel);
    if (!Array.isArray(eventSets)) {
      eventSets = [];
    }
    if (!once) {
      eventSets.push(handler);
    } else {
      const wrapperFunc = function (...args) {
        handler.apply(this, args);
        this.$off(channel, wrapperFunc);
      };
      eventSets.push(wrapperFunc);
    }
    this._map.set(channel, eventSets);
  }

  /**
   * 移除事件监听
   * @param {String} channel 移除监听事件的频道
   * @param {Function} handler 移除监听事件的处理器
   */
  $off(channel, handler) {
    let eventSets = this._map.get(channel);
    if (!Array.isArray(eventSets)) {
      console.warn("移除的事件频道不存在");
      return;
    }
    // 如果不传递handler则移除该管道的所有监听
    if (typeof handler !== "function") {
      this._map.delete(channel);
    } else {
      // 否则只删除一个事件监听器
      const delIdx = eventSets.findIndex((f) => f === handler);
      if (delIdx < 0) {
        console.warn("当前尚未设置此handler的监听");
        return;
      } else {
        eventSets.splice(delIdx, 1);
        this._map.set(channel, eventSets);
      }
    }
  }
}

const events = new EventEmitter();

events.$on("handleClick", (...args) => {
  console.log("handleClick", args);
});

events.$once("handleClick", (...args) => {
  console.log("handleClick Once", args);
});

function handler(...args) {
  console.log(args, "函数");
}

events.$on("click", handler);

events.$once("click", handler);

events.$emit("handleClick", 1, 2, 3, 4, 5);
events.$emit("handleClick", 1, 2, 3, 4, 5);

events.$emit("click", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

events.$emit("click", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "second");

events.$off("click", handler);

events.$emit("click", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

events.$off("handleClick");

events.$emit("handleClick", 1, 2, 3, 4, 5);
