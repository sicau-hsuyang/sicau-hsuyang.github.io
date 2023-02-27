## `Compose`函数

`Compose`函数的用处比较多，像比如`koa`的洋葱模型，`React`中`Redux`的插件`redux-saga`，还有`Vue`的过滤器，还有`babel`编译装饰器的处理，这些都是基于`Compose`函数的。

举一个大家比较熟悉的`Vue`的例子:

```vue
<template>
  <div class="book">￥{{ price | toFixed(2) | thousands }}</div>
</template>

<script>
export default {
  name: "Book",
  filters: {
    toFixed(price, precision) {
      return Number.parseFloat(price).toFixed(precision);
    },
    thousands(price) {
      const num_str = price.toString();
      const parts = num_str.split(".");
      const exp = /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g;
      return (
        parts[0].replace(exp, "$&,") +
        (parts.length > 1 ? "." + parts[1].replace(/\,/g, "") : "")
      );
    },
  },
  props: {
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
};
</script>
```

去年（`2022`年），我在面试美团的二面的时候被问到过，不过明白它的原理的话，写起来其实并不难。

在上述这种场景下，我们就可以把`Compose`函数定义成如下形式。

```ts
function Compose(fns: Function[], initArgs: any);
```

```js
function Compose(fns, initArgs) {
  let res = null;
  // 是否初始化
  let init = false;
  // Compose函数一般是后加入的先执行
  const reverseFns = fns.reverse();
  for (let i = 0; i < reverseFns.length; i++) {
    const fn = reverseFns[i];
    // 没有初始化，使用初始化的值，初始化之后使用上一次的值
    res = fn(init ? res : ((init = true), initArgs));
  }
  return res;
}
```

```js
function toFixed(precision) {
  return function (price) {
    return Number.parseFloat(price).toFixed(precision);
  };
}

function toThousands(price) {
  const num_str = price.toString();
  const parts = num_str.split(".");
  const exp = /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g;
  return (
    parts[0].replace(exp, "$&,") +
    (parts.length > 1 ? "." + parts[1].replace(/\,/g, "") : "")
  );
}

const price = 1000;

const renderPrice = Compose([toFixed(2), toThousands], price);
```
