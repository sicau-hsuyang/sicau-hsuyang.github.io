## 图片懒加载

图片懒加载是一个前端开发中常用的优化手段，主要是优先加载可视区的图片，当用户有操作的时候，有新的图片进入可视区，随即再加载的方式。

图片懒加载有两种实现的方式，比较常用的手段有`2种`，第一种方式用到的核心`API`，是`getBoundingClientRect`，第二种方式用到的核心`API`是一个比较实用但是可能有些朋友还比较陌生的`API`，叫做`IntersectionObserver`

### `方法1: getBoundingClientRect`

`getBoundingClientRect`主要用途是用来判断元素是否可见，这个`API`可以返回一个元素距离浏览器窗口四角的距离，以及元素的宽高，和元素在屏幕中的位置，其结果的`TS`定义如下：

```ts
interface DOMRectReadOnly {
  readonly bottom: number;
  readonly height: number;
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly width: number;
  readonly x: number;
  readonly y: number;
  toJSON(): any;
}
```

如果一个元素在视口中可见的话，那么满足如下条件：

```js
function isVisible(el) {
  const position = el.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;
  // 顶部边缘可见
  const topVisible = position.top > 0 && position.top < windowHeight;
  // 底部边缘可见
  const bottomVisible = position.bottom < windowHeight && position.bottom > 0;
  return topVisible || bottomVisible;
}
```

图片最初的时候，不要直接将地址绑定在`src`属性上，我们给它设置一个自定义属性`data-src`，然后当判断到元素进入视口之后，读取这个属性，并且将其设置给`src`属性。

```html
<img
  data-src="https://aliimg.changbalive.com/photo/360/9bfe4674fad8e9f7_100_100.jpg"
/>
```

然后在页面初始化的时候以及页面滚动的时候，根据图片是否在可视区加载图片。由于我们需要绑定`window.onload`和`window.onscroll`事件，但是由于这个事件可能别的程序员也有可能处理，因次为了防止丢失别人的处理逻辑，我们需要使用`装饰模式`为上述连个事件绑定处理器。

另外，由于`window.onscroll`会触发的比较频繁，出于性能考虑，我们还需要对滑动事件处理器绑定经过节流处理之后的函数。

```js
/**
 * 增加前置执行的函数
 */
Function.prototype.beforeExec = function (fn) {
  const _this = this;
  return function wrapper() {
    fn.apply(this, arguments);
    return _this.apply(this, arguments);
  };
};
/**
 * 增加后置执行的函数
 */
Function.prototype.afterExec = function (fn) {
  const _this = this;
  return function wrapper() {
    const response = _this.apply(_this, arguments);
    _this.apply(_this, arguments);
    return response;
  };
};

function lazyLoadImages() {
  const images = document.querySelectorAll("img");
  for (let img of images) {
    const realSrc = img.dataset.src;
    if (!realSrc) continue;
    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = "";
    }
  }
}

//节流1S
const throttledLazyLoadImages = throttle(
  lazyLoadImages,
  {
    trailing: false,
  },
  1000
);

window.onload =
  typeof window.onload === "function"
    ? window.onload.afterExec(lazyLoadImages)
    : lazyLoadImages;
// 防止scroll的触发频率过高
window.onscroll =
  typeof window.onscroll === "function"
    ? window.onscroll.afterExec(throttledLazyLoadImages)
    : throttledLazyLoadImages;
```

虽然上述代码已经能正常运行了，但是在实际开发中，我们一般都是基于框架写代码，以`vue`框架为例，这样的代码特别适合封装成一个指令，对于使用者来说，只需要采用如下方式调用，毫无学习成本：

```vue
<template>
  <img
    v-lazyload="https://aliimg.changbalive.com/photo/360/9bfe4674fad8e9f7_100_100.jpg"
  />
</template>
```

以下是懒加载指令的完整实现：

```js
import { throttle } from "lodash-es";
/**
 * 增加前置执行的函数
 */
typeof Function.prototype.beforeExec !== "function" &&
  (Function.prototype.beforeExec = function (fn) {
    const _this = this;
    return function wrapper() {
      fn.apply(this, arguments);
      return _this.apply(this, arguments);
    };
  });
/**
 * 增加后置执行的函数
 */
typeof Function.prototype.afterExec !== "function" &&
  (Function.prototype.afterExec = function (fn) {
    const _this = this;
    return function wrapper() {
      const response = _this.apply(_this, arguments);
      fn.apply(_this, arguments);
      return response;
    };
  });
/**
 * 定义一个Set，用于存储挂载v-lazyload指令的元素
 */
const set = new Set();
/**
 * 处理图片懒加载逻辑
 */
function lazyLoadImages() {
  // 从Set中取出所有尚未加载的图片
  const images = set.values();
  let readyDelImgs = [];
  for (const img of images) {
    const realSrc = img.dataset.src;
    if (img.src || !realSrc) {
      continue;
    }
    // 已加载的图片要从set中拿掉
    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = "";
      readyDelImgs.push(img);
    }
  }
  readyDelImgs.forEach((el) => {
    set.delete(el);
  });
  readyDelImgs = null;
}

const throttledLazyLoadImages = throttle(
  lazyLoadImages,
  {
    trailing: false,
  },
  1000
);

function isVisible(el) {
  const position = el.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;
  // 顶部边缘可见
  const topVisible = position.top > 0 && position.top < windowHeight;
  // 底部边缘可见
  const bottomVisible = position.bottom < windowHeight && position.bottom > 0;
  return topVisible || bottomVisible;
}

/**
 * 防止侵入已有逻辑，因此保险起见
 */
window.onload =
  typeof window.onload === "function"
    ? window.onload.afterExec(lazyLoadImages)
    : lazyLoadImages;
// 防止scroll的触发频率过高
window.onscroll =
  typeof window.onscroll === "function"
    ? window.onscroll.afterExec(throttledLazyLoadImages)
    : throttledLazyLoadImages;

export default {
  created(el, binding) {
    if (!el.dataset.src) {
      el.dataset.src = binding.value;
      set.add(el);
    }
  },
};
```

### `方法2: IntersectionObserver`

使用`IntersectionObserver`和使用`getBoundingClientRect`方法差异还算比较大的，因为`getBoundingClientRect`告诉我们的是元素的位置，并且还需要我们自己判断元素是否在视口，同时我们还需要在`window`对象特定的事件里面判断这些业务。

而使用`IntersectionObserver`，这些事儿全部都交给它在做了，我们只需要为其绑定回调函数，然后一旦元素进入视口，回调函数自动就触发了，代码需要处理的业务逻辑变简单了许多。

`IntersectionObserver`这个`API`本质是用来判断元素之间是否相交，只是在这个场景下，我们判断的是特定的元素是否和视口相交，希望读者加以体会，不要混淆。

以下是基于`IntersectionObserver`编写的图片懒加载指令的实现：

```js
const itObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      // entry.intersectionRatio 如果正在变大(可以用Map来记住某个元素对应的intersectionRatio从而看出变化)，
      // 说明当前被观察的元素正在进入某个元素（本例是视口），否则是远离
      if (entry.isIntersecting) {
        if (entry.target.src || !entry.target.dataset.src) {
          continue;
        }
        const tmpSrc = entry.target.getAttribute("data-src");
        entry.target.src = tmpSrc;
        entry.target.removeAttribute("data-src");
      }
    }
  },
  {
    // 设置相交的阈值
    threshold: 0.1,
  }
);

export default {
  created(el, binding) {
    if (!el.dataset.src) {
      el.dataset.src = binding.value;
    }
    itObserver.observe(el);
  },
  beforeUnmount(el) {
    itObserver.unobserve(el);
  },
};
```
