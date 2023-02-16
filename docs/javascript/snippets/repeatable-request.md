## 支持重复请求的方法

这个方法主要是看你对`Promise`的理解程度了，主要思路就是如果`Promise.catch`捕获到错误了的话，需要重新发起请求，如果超过了最大的重试次数的话，则不再进行了。

以下是递归的实现：

```js
function request(url, maxCount = 5) {
  return fetch(url).catch((err) => {
    // 如果超出了最大错误对外返回一个rejected态的Promise，否则根据当前已请求次数决定是否重试
    return maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1);
  });
}
```

递归的实现看起来比较简洁，如果有些同学对递归看不顺眼的话，以下是非递归的写法。

非递归的实现思路主要还是在怎么继续进行下一次的请求，首先这个肯定是线性的数据结构，我就会考虑到`队列 + 循环`来实现了。

```js
async function request(url, maxCount = 5) {
  // 包裹的函数，定义成函数的原因，是可能在这里面可以支持额外的操作
  const func = (url) => fetch(url);
  const queue = [func];
  maxCount--;
  while (queue.length) {
    const fn = queue.shift();
    try {
      const resp = await fn(url);
      return resp;
    } catch (exp) {
      if (maxCount <= 0) {
        throw new Error(exp);
      } else {
        maxCount--;
        queue.push(func);
      }
    }
  }
}
```
