## 深克隆

本文不介绍**深克隆和浅克隆的区别**，若对此有疑惑的朋友请自行查阅资料

另外，本文主要是阐述哈希表的应用，给出的实现并没有完全考虑深克隆中各种可能的问题，如果对此感兴趣的朋友可以自行查阅`lodash`的源码。

再者，在深拷贝中，我们使用哈希表，需要使用`Map`或者`WeakMap`，因为使用对象作为哈希表的话，无法用对象作为`key`。

深拷贝的算法实现思路，最简单的就是递归了，把已经拷贝过的对象和新生成的对象映射加入到哈希表中去，并且递归拷贝的时候，要带上这个哈希表递归。需要注意一点就是，拷贝过程中，一旦新生成的对象产生，就需要建立映射，而不是，等拷贝完成再建立映射，否则就无法区分当前对象是否已经被拷贝了，出现最大调用堆栈报错。

算法实现如下：

```js
/**
 * 使用深度优先深克隆对象
 * @param {Array<any> | object} obj
 * @param { Map<Array<any> | object, Array<any> | object> } map
 * @returns
 */
function deepClone(obj, map = new Map()) {
  // 如果已经拷贝过，则可以直接返回拷贝过的值，主要是为了防止循环引用
  let cloneObj = map.get(obj);
  if (typeof cloneObj !== "undefined") {
    return cloneObj;
  }
  // 初始化拷贝的对象
  cloneObj = Array.isArray(obj) ? [] : {};
  // 建立已经拷贝的引用，不能再开始拷贝属性了再建立拷贝引用，否则将会导致递归最大调用栈的问题发生
  map.set(obj, cloneObj);
  // 对拷贝对象挨个赋值
  for (let prop in obj) {
    // 遇到对象，则递归拷贝
    if (obj[prop] instanceof Object) {
      cloneObj[prop] = deepClone(obj[prop], map);
      // 拷贝完成后，还要将其加入引用Map中去
      map.set(obj[prop], cloneObj[prop]);
    } else {
      cloneObj[prop] = obj[prop];
    }
  }
  return cloneObj;
}
```
