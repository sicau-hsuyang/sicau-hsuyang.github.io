## EventEmitter

`EventsEmitter`准确说就是发布订阅模式。

在实际开发中，它有着非常广泛的应用，比如可以用它结合`Promise`的`API`来z做一些异步操作的通知，实现比较优雅的`API`设计。

对于它，我们需要实现几个`API`

- `$on` 监听指定频道，同一个频道可以多次监听
- `$once` 监听指定频道一次，触发之后就终止监听
- `$off` 停止指定频道的监听
- `$emit` 触发某个频道的事件

在`DOM`的`removeEventListeners`和`addEventListeners`其实就是用的这种思路，但是，需要注意的是`removeEventListeners`必须要传入在`addEventListeners`相同的`handler`，否则无法移除事件的监听。但是在有时候这样使用不是特别方便，为此，我将`$off`第二个参数设计成了可选参数，如果传入了则指定移除特定的`handler`，如果没有传，则移除当前频道的所有`handler`。

代码实现如下：

```js
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
      const wrapperFunc = function(...args) {
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
```

以下是测试用例：

```js
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
// handleClick (5) [1, 2, 3, 4, 5]
// handleClick Once (5) [1, 2, 3, 4, 5]
// handleClick (5) [1, 2, 3, 4, 5]
// (10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 函数
// (10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 函数
// (11) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'second'] 函数
```
