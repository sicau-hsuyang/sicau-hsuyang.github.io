## 代理模式

### 1、基本概念

代理模式是为其他对象提供一种代理以控制对这个对象的访问

就拿前端经常简单的场景举例，比如有些操作并不想频繁的触发它，需要有人限制它的触发频率；就比如有些时候我们在操作数据的时候想做一些额外的事儿，比如`Vue`的双向数据绑定。

什么时候适合使用代理模式呢？——想在访问一个对象时做一些控制。

代理模式的`UML`图如下：

<div align="center">
  <img :src="$withBase('/design-pattern/proxy-pattern.png')" alt="代理模式的UML" />
</div>

### 2、代码示例

```ts
interface Subject {
  profit(number: number): void;
}

class RealSubject implements Subject {
  profit(number: number): void {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(`you can earn money ${number} every day`);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  }
}

class ProxySubject implements Subject {
  private readSubject = new RealSubject();

  profit(number: number): void {
    if (number <= 0) {
      console.warn("salary must bigger than zero");
      return;
    }
    this.readSubject.profit(number);
  }
}

(function bootstrap() {
  const sub = new ProxySubject();
  for (let i = 0; i < 10; i++) {
    const rnd = Math.random();
    sub.profit(rnd > 0.5 ? Number.parseInt((rnd * 1000).toFixed(0)) : 0);
  }
})();
```

### 3、前端开发中的实践

频繁触发的操作，出于性能考虑，我们会降低它触发的频率，这就是`节流`和`防抖`。

**`节流`：规定的时间内重复触发，函数只会执行一次。**

**节流的应用场景：主要是按钮的点击，屏幕缩放等操作，需要处理一些计算等**。

**`防抖`：规定的时间内重复触发，每次触发都会重新计算时间，最后再触发一次真正的操作。比如你设置了一个`1S`的防抖，如果第`1S`内连续触发了`10`次，则第一秒内函数一次都不会执行，在第一秒末开始计算触发时间，第`2S`真正触发。**

**防抖的应用场景：搜索框搜索**

另外，`ES6`新增了`Proxy`，我们可以直接使用语法糖实现代理模式。就比如`Vue3`数据的双向绑定就使用的是`Proxy`，还可以用`Proxy`来实现具有`负数`索引的数组.

#### 3.1、实现数组负数的索引

```js
function SafetyArray(arr) {
  return new Proxy(arr, {
    get(target, propKey, receiver) {
      // 如果数组为空，
      const digitProp = Number.parseInt(propKey);
      if (target.length === 0 && digitProp < 0) {
        digitProp = Math.abs(digitProp);
      }
      if (propKey < 0) {
        propKey = target.length + digitProp;
      }
      return target[propKey];
    },
    set(target, propKey, value, receiver) {
      const digitProp = Number.parseInt(propKey);
      // 不允许给数组设置除了数字以外的键
      if (Number.isNaN(digitProp) && propKey !== "length") {
        return false;
      }
      if (target.length === 0 && digitProp < 0) {
        digitProp = Math.abs(digitProp);
      }
      if (propKey < 0) {
        propKey = target.length + digitProp;
      }
      target[propKey] = value;
      return true;
    },
  });
}
```

#### 3.2、节流

由于`JS`语法特性比较灵活，在前端开发中，`节流`和`防抖`这两个代理模式的应用场景，你可能并没有发觉。这是因为`JS`的函数可以作为参数传递，和闭包搭配使用，避免了我们去编写上述那么多的代码。

下述代码中，`callback`函数就相当于`UML`图中的`RealSubject`类，返回的函数`fn`就相当于是图中的`Proxy`类，当我们调用`fn`的时候，它会根据间隔的时间是否执行真正的`callback`而改变了函数的行为。

```js
function throttle(callback, ms) {
  let pre = Date.now();
  return function fn(...args) {
    let now = Date.now();
    // 如果超过了时间段，执行函数
    if (now - pre >= ms) {
      callback.apply(this, args);
      // 开启下一个阶段可用
      pre = now;
    }
  };
}
```

以上`节流`是不使用定时器的简单实现，此外，`节流`还可以使用定时器实现。

```js
function throttle(callback, ms) {
  let timer = null;
  return function fn(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        callback.apply(this, args);
        timer = null;
      }, ms);
    }
  };
}
```

#### 3.3、防抖

```js
function debounce(callback, ms) {
  let timer = null;
  return function fn(...args) {
    // 如果timer存在，说明还没有到执行的时间，需要清理定时器
    if (timer) {
      clearTimeout(timer);
      return;
    }
    // 设置一个定时器，在规定的时间内触发即可。
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, ms);
  };
}
```
