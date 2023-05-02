## memoize 函数

对于`纯函数`，如果参数一定，那么它的结果是确定的，如果对于明明已经确定的结果，多次的重复计算是得不偿失的。

纯函数满足以下两个条件：

- 1、相同的输入必须始终产生相同的输出，即函数的行为不能受到外部状态的影响。
- 2、函数不能修改传递给它的参数，也不能修改全局变量或引用传递的对象。这是为了避免任何可能的副作用，保证函数的行为是确定性的。

因此，我们可以将函数某次输入的参数和其对应的执行的结果记录下来，如果日后再次用到，可以直接从缓存里面获取而不需要再次获取，从而提高程序的执行效率。

`memoize`函数的实现细节跟我们的`节流`,`防抖`其实是有共同之处的，都将利用`JS`的`闭包`的语法特性，输入参数是一个函数，利用闭包来做缓存，对外再返回一个函数，有了这个理论基础，就可以编写代码了。

### 版本 1

```ts
type Func<T extends any[], R> = (...args: T) => R;
function memoize<T extends any[], R>(fn: Func<T, R>): Func<T, R> {
  const cache: Record<PropertyKey, any> = {};
  return function (...args: any[]) {
    // 将参数序列化，作为缓存的key
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
```

上述代码，除了足够简单，真的是一无是处，为什么这样说呢，这就得说道一下`JSON.stringify`了，很多数据类型不能序列化，一旦参数过多，序列化得到的`key`长的令人发指，一旦缓存的内容过多时，那么占用的内存肯定就会很多，这样做不好，除此之外，还有一个问题是，我们的缓存用的时一个对象进行存储的，但是对象只能接受`String`或`Symbol`类型的`key`，也存在相当大的不足。

### 版本 2

以上问题，我们可以参考一下`lodash`的实现优化。

以下代码是我参考`lodash`的源码进行修改得到的：

```js
function memoize(func, resolver) {
  if (
    typeof func != "function" ||
    (resolver && typeof resolver != "function")
  ) {
    throw new TypeError("Expected a function");
  }
  var memoized = function () {
    var args = arguments,
      // resolver作为一个可选参数，如果用户不提供，函数以第一个参数作为缓存的key，若用户提供，则以用户提供的缓存key存储
      key = resolver ? resolver.apply(this, args) : args[0],
      cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new Map();
  return memoized;
}
```

此时，我们已经解决了主要的矛盾，性能方面已经做的不错了，但是如果这个题出现在面试里面的话，满分 100 分，你已经能得到 90 分了，剩下的 10 分到哪儿去了呢？这就是通过不断的刻苦训练，将不同地方的知识点融会贯通才能熟练应用的了。

在我刚学前端的时候，曾经在慕课上听过曾就职于小米的前端大佬`刘炬光`说过一句话，大概意思就是说：缓存的一个使用难点就是你不知道缓存在什么时间销毁。

目前这个缓存机制是没办法进行销毁的，因此，我们可以引入一个缓存的销毁机制，比较常用的就是`LRU`缓存算法（`Vue`的`keep-alive`也是使用的这个算法）。

### 版本 3

这个地方，我就不引入第三方库了，在我的数据结构和算法章节我曾经实现过一个`LRU`，因此，我直接把代码`copy`过来(实际项目中，可以考虑直接使用成熟的第三方库`lru-cache`)

以下是加入了`LRU`的`memoize`函数的实现：

```ts
interface DoubleLinkedListNode<K, T> {
  /**
   * 前驱节点
   */
  prev?: DoubleLinkedListNode<K, T> | null;
  /**
   * 后继节点
   */
  next?: DoubleLinkedListNode<K, T> | null;
  /**
   * value
   */
  val: T;
  /**
   * key
   */
  key: K;
}

class LRUCache<P, V> {
  static EMPTY_SENTINEL = new Error("empty node");

  capacity: number;

  size = 0;

  mapping: Map<P, DoubleLinkedListNode<P, V>> = new Map();

  head: null | DoubleLinkedListNode<P, V> = null;

  tail: null | DoubleLinkedListNode<P, V> = null;

  constructor(capacity: number) {
    if (capacity <= 0) {
      console.error("the LRUCache capacity must bigger than zero");
    }
    this.capacity = capacity;
  }

  public setCapacity(maxCapacity: number) {
    this.capacity = maxCapacity;
  }

  private createNode(key: P, val: V): DoubleLinkedListNode<P, V> {
    return {
      prev: null,
      next: null,
      val,
      key,
    };
  }

  public has(key: P): boolean {
    return this.mapping.has(key);
  }

  public get(key: P): V | typeof LRUCache.EMPTY_SENTINEL {
    let node = this.mapping.get(key);
    if (!node) {
      return LRUCache.EMPTY_SENTINEL;
    }
    // 刷新节点
    this.refresh(node);
    return node.val;
  }

  private refresh(node: DoubleLinkedListNode<P, V>): void {
    if (!node) {
      console.warn("failed to refresh cache node");
      return;
    }
    let prevNode = node.prev;
    let nextNode = node.next;
    // 如果不存在前驱节点，说明当前节点就是最近使用过的节点，无需刷新
    if (!prevNode) {
      // this.head = node;
      return;
    }
    // 如果不存在后继节点，说明当前节点就是最后一个节点，直接提到最前面去
    if (!nextNode) {
      prevNode.next = null;
      this.tail = prevNode;
      node.next = this.head;
      this.head!.prev = node;
      this.head = node;
    }
    // 如果同时存在前驱和后继节点
    if (prevNode && nextNode) {
      // 把原来的两个节点接到一起
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      // 然后把当前这个节点提到最前面去
      node.next = this.head;
      this.head!.prev = node;
      node.prev = null;
      this.head = node;
    }
  }

  public set(key: P, value: V) {
    let oldNode = this.mapping.get(key);
    // 旧节点不存在
    if (!oldNode) {
      const newNode = this.createNode(key, value);
      // 设置新值
      this.mapping.set(key, newNode);
      if (this.size === 0) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head!.prev = newNode;
        this.head = newNode;
      }
      this.size++;
      if (this.size > this.capacity) {
        let oldKey = this.tail!.key;
        this.mapping.delete(oldKey);
        // 解开最后一个节点
        let preTail = this.tail!.prev;
        preTail!.next = null;
        this.tail!.prev = null;
        this.tail = preTail!;
        this.size--;
      }
    } else {
      oldNode.val = value;
      this.refresh(oldNode);
    }
  }
}

type Func<T extends any[], R> = (...args: T) => R;

export function memoize<T extends any[], R>(
  func: Func<T, R>,
  resolver?: ((...args: any[]) => PropertyKey) | PropertyKey,
  maxSize?: number
): Func<T, R> {
  if (typeof func != "function") {
    throw new TypeError("Expected a function");
  }
  const memoizeCache = new LRUCache<PropertyKey, T>(maxSize || 10);
  const memoized = function () {
    const args = arguments,
      // resolver作为一个可选参数，如果用户不提供，函数以第一个参数作为缓存的key，若用户提供，则以用户提供的缓存key存储
      key =
        typeof resolver === "function"
          ? resolver.apply(this, args)
          : resolver || args[0],
      cache = memoizeCache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    memoizeCache.set(key, result);
    return result;
  };
  return memoized;
}
```
