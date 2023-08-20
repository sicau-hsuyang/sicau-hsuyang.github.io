## 基于事件循环的节流函数

在阅读此节之前，请你确保已经熟练的掌握 JavaScript 的事件循环机制

首先说明一下什么情况下有这样一个场景。

以下是一个 Vue 组件

```vue
<template>
  <div>
    {{ i }}
  </div>
  <button @click="doIncrease">增加计数</button>
</template>

<script setup>
import { ref } from 'vue'
const i = ref(0)

doIncrease() {
  i.value++;
  i.value++;
}
</script>
```

当我们点击的时候，i 肯定是变动了两次，但是 vue 是肯定只更新一次的（很明显两次 i 的变动是在**一轮事件循环**内，没有必要更新两次。）

所以，这就提出了一个要求，如何实现一个函数实现基于事件循环来节流呢？

实现这个函数，我们还是得有模有样的参考`lodash`的`throttle`方法，心中先有一个大概的实现框架：

```ts
export declare function eventLoopThrottle<T extends unknown[], R>(
  fn: (...args: T) => R,
  ctx: unknown
): (...args: T) => R;
```

然后再思考一下，既然是基于事件循环，肯定会有一个标记，根据标记判断是否能够执行函数，然后在微任务队列里面重置这个标记。

```ts
export function eventLoopThrottle<T extends unknown[], R>(
  fn: (...args: T) => R,
  ctx: unknown
): (...args: T) => R {
  let isExecuted = false;
  return function throttled(...args: T) {
    // 如果已经执行过，不再执行
    if (isExecuted) {
      return;
    }
    // 执行函数，并且拿到结果
    const response = fn.apply(ctx || this, args);
    // 设置标记，同一轮事件循环内将无法再次执行
    isExecuted = true;
    Promise.resolve().then(() => {
      // 在微任务队列里面清楚已经执行的标记
      isExecuted = false;
    });
    return response;
  };
}
```
